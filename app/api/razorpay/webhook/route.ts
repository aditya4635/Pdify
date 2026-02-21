import { headers } from "next/headers";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { getDbConnection } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("X-Razorpay-Signature") as string;

  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET!;

  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature !== signature) {
    return new NextResponse("Invalid signature", { status: 400 });
  }

  const event = JSON.parse(body);
  const sql = await getDbConnection();

  try {
    // Handle Subscription Authenticated (Created/First Payment)
    if (event.event === "subscription.authenticated") {
      const subscription = event.payload.subscription.entity;
      const payment = event.payload.payment.entity;

      const razorpaySubscriptionId = subscription.id;
      const razorpayPlanId = subscription.plan_id;
      const razorpayCustomerId = subscription.customer_id;
      const userId = subscription.notes?.userId;
      
      // Calculate Unix timestamp for the end of current period
      const currentPeriodEnd = new Date(subscription.current_end * 1000);

      if (userId) {
        await sql`
          CREATE TABLE IF NOT EXISTS user_subscriptions (
              id SERIAL PRIMARY KEY,
              user_id VARCHAR(255) UNIQUE NOT NULL,
              razorpay_customer_id VARCHAR(255),
              razorpay_subscription_id VARCHAR(255) UNIQUE,
              razorpay_plan_id VARCHAR(255),
              razorpay_current_period_end TIMESTAMP
          );
        `;

        await sql`
          INSERT INTO user_subscriptions (user_id, razorpay_customer_id, razorpay_subscription_id, razorpay_plan_id, razorpay_current_period_end)
          VALUES (${userId}, ${razorpayCustomerId}, ${razorpaySubscriptionId}, ${razorpayPlanId}, ${currentPeriodEnd})
          ON CONFLICT (user_id) 
          DO UPDATE SET 
              razorpay_subscription_id = EXCLUDED.razorpay_subscription_id,
              razorpay_plan_id = EXCLUDED.razorpay_plan_id,
              razorpay_current_period_end = EXCLUDED.razorpay_current_period_end;
        `;
      }
    }

    // Handle Subsequent Renewals
    if (event.event === "subscription.charged") {
      const subscription = event.payload.subscription.entity;
      
      const razorpaySubscriptionId = subscription.id;
      const currentPeriodEnd = new Date(subscription.current_end * 1000);

      await sql`
          UPDATE user_subscriptions
          SET razorpay_current_period_end = ${currentPeriodEnd}
          WHERE razorpay_subscription_id = ${razorpaySubscriptionId};
      `;
    }

  } catch (error: any) {
    console.error("[RAZORPAY_WEBHOOK_ERROR]", error);
    return new NextResponse("Webhook processing error", { status: 500 });
  }

  return new NextResponse("OK", { status: 200 });
}
