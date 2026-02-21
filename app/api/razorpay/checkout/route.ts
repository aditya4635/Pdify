import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { planId } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!planId) {
      return new NextResponse("Plan ID is required", { status: 400 });
    }

    // Razorpay subscription creation
    const subscription = await razorpay.subscriptions.create({
      plan_id: planId,
      customer_notify: 1, // Notify customer via email
      total_count: 12, // For example, 12 months billing cycles
      notes: {
        userId: userId,
      },
    });

    return NextResponse.json({
      subscriptionId: subscription.id,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
    });

  } catch (error: any) {
    console.error("[RAZORPAY_CHECKOUT]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
