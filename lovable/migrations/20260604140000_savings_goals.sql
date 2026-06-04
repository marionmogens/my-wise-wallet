CREATE TABLE IF NOT EXISTS monetra_savings_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES monetra_users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  target_amount NUMERIC(14,2) NOT NULL CHECK (target_amount > 0),
  saved_amount NUMERIC(14,2) NOT NULL DEFAULT 0,
  color TEXT NOT NULL DEFAULT '#6366f1',
  target_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_monetra_goals_user ON monetra_savings_goals(user_id);
