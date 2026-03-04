"use server";

import { getDbConnection } from "./db";
import { PLAN_LIMITS, PLAN_FILE_SIZE_LIMITS, UserPlan, UserPlanInfo } from "@/types";

async function ensureUsersTable(): Promise<void> {
  const sql = await getDbConnection();
  await sql`
    CREATE TABLE IF NOT EXISTS pdify_users (
      id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id             TEXT        UNIQUE NOT NULL,
      email               TEXT,
      plan                TEXT        NOT NULL DEFAULT 'free',
      stripe_customer_id  TEXT,
      created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_pdify_users_user_id ON pdify_users (user_id)
  `;
}

export async function syncUser(userId: string, email: string | null): Promise<void> {
  await ensureUsersTable();
  const sql = await getDbConnection();
  await sql`
    INSERT INTO pdify_users (user_id, email)
    VALUES (${userId}, ${email})
    ON CONFLICT (user_id)
    DO UPDATE SET
      email      = COALESCE(EXCLUDED.email, pdify_users.email),
      updated_at = now()
  `;
}

export async function getUserPlanInfo(userId: string): Promise<UserPlanInfo> {
  await ensureUsersTable();
  const sql = await getDbConnection();

  const [userRows, countRows] = await Promise.all([
    sql`SELECT plan FROM pdify_users WHERE user_id = ${userId}`,
    sql`SELECT COUNT(*) AS cnt FROM pdf_summaries WHERE user_id = ${userId}`,
  ]);

  if (!userRows.length) {
    await syncUser(userId, null);
  }

  const plan = (userRows[0]?.plan as UserPlan) ?? "free";
  const summariesUsed = Number(countRows[0]?.cnt ?? 0);
  const limit = PLAN_LIMITS[plan] ?? PLAN_LIMITS.free;
  const maxFileSizeMB = PLAN_FILE_SIZE_LIMITS[plan] ?? PLAN_FILE_SIZE_LIMITS.free;

  return { plan, summariesUsed, limit, isOverLimit: summariesUsed >= limit, maxFileSizeMB };
}

export async function incrementSummaryUsage(_userId: string): Promise<void> {
  // Usage is derived live from pdf_summaries COUNT — nothing to increment
}
