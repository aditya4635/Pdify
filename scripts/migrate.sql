-- Run this once in your Neon SQL console (optional - code auto-creates it)
-- Uses 'pdify_users' to avoid conflicts with existing 'users' tables

CREATE TABLE IF NOT EXISTS pdify_users (
  id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             TEXT        UNIQUE NOT NULL,
  email               TEXT,
  plan                TEXT        NOT NULL DEFAULT 'free',
  summaries_used      INT         NOT NULL DEFAULT 0,
  stripe_customer_id  TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_pdify_users_user_id ON pdify_users (user_id);
