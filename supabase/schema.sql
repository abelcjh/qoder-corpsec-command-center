-- CorpSec Command Center — Supabase Schema
-- Run this in the Supabase SQL Editor after creating a project.
-- The fixture-backed local state path does NOT need a real Supabase instance.

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Departments that staff can belong to.
CREATE TYPE department AS ENUM ('admin', 'audit', 'tax', 'accounting', 'corp_sec');

-- Staff users. Department + role drive client-database scoping.
CREATE TABLE staff_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  department department NOT NULL,
  role TEXT NOT NULL DEFAULT 'staff', -- admin, manager, staff
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Client company master record. Deactivating retains history.
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  registration_no TEXT UNIQUE NOT NULL,
  incorporation_date DATE,
  ssm_state TEXT,
  sic_codes TEXT[] DEFAULT '{}',
  registered_address TEXT,
  directors TEXT[] DEFAULT '{}',
  company_secretary TEXT,
  financial_year_end TEXT,
  departments TEXT[] DEFAULT '{}',
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Contacts linked to a company.
CREATE TABLE company_contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  role TEXT,
  preferred_channel TEXT NOT NULL DEFAULT 'email', -- email, whatsapp, sms
  is_primary BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Predefined compliance reminder rules.
CREATE TABLE compliance_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  department department NOT NULL,
  default_subject TEXT NOT NULL,
  default_body TEXT NOT NULL,
  default_every_n_working_days INTEGER NOT NULL DEFAULT 30,
  variables TEXT[] DEFAULT '{}',
  statutory_ref TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Scheduled reminder jobs.
CREATE TABLE scheduled_send_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES company_contacts(id) ON DELETE SET NULL,
  rule_id UUID REFERENCES compliance_rules(id) ON DELETE SET NULL,
  department department NOT NULL,
  channel TEXT NOT NULL DEFAULT 'email', -- email, whatsapp, sms
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  first_send_at TIMESTAMPTZ NOT NULL,
  every_n_working_days INTEGER NOT NULL,
  stop_date DATE,
  status TEXT NOT NULL DEFAULT 'active', -- active, paused, completed, deactivated
  created_by UUID REFERENCES staff_users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Send logs / proof evidence records.
CREATE TABLE send_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID NOT NULL REFERENCES scheduled_send_jobs(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES company_contacts(id) ON DELETE SET NULL,
  scheduled_run_at TIMESTAMPTZ NOT NULL,
  sent_at TIMESTAMPTZ,
  sender_staff_id UUID REFERENCES staff_users(id),
  sender_email TEXT,
  recipient TEXT NOT NULL,
  channel TEXT NOT NULL,
  status TEXT NOT NULL, -- scheduled, sent, delivered, failed, simulated
  message_snapshot TEXT NOT NULL,
  provider_message_id TEXT,
  evidence_type TEXT NOT NULL DEFAULT 'simulated', -- simulated, provider_receipt, gmail_print
  fixture_marked BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Optional proof documents (e.g. Gmail print-to-PDF) attached to send logs.
CREATE TABLE proof_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  send_log_id UUID NOT NULL REFERENCES send_logs(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL, -- receipt, screenshot, pdf, printout
  storage_path TEXT,
  metadata JSONB DEFAULT '{}',
  uploaded_by UUID REFERENCES staff_users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Immutable audit event stream for all mutations.
CREATE TABLE audit_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_staff_id UUID REFERENCES staff_users(id),
  actor_email TEXT,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  detail JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for common lookups
CREATE INDEX idx_companies_active ON companies(active);
CREATE INDEX idx_companies_departments ON companies USING GIN(departments);
CREATE INDEX idx_contacts_company ON company_contacts(company_id);
CREATE INDEX idx_jobs_company ON scheduled_send_jobs(company_id);
CREATE INDEX idx_jobs_status ON scheduled_send_jobs(status);
CREATE INDEX idx_send_logs_job ON send_logs(job_id);
CREATE INDEX idx_send_logs_company ON send_logs(company_id);
CREATE INDEX idx_audit_events_actor ON audit_events(actor_staff_id);
CREATE INDEX idx_audit_events_entity ON audit_events(entity_type, entity_id);

-- Row Level Security (RLS) — comments explain intended policies.
-- Enable RLS on all tables. In production, policies should be written to:
-- 1. Allow admin users to read/update all rows.
-- 2. Allow staff to read only companies whose departments overlap with their own department.
-- 3. Allow staff to create jobs/logs only for companies in their department scope.
-- 4. Restrict audit_events to read-only for non-admin staff.

ALTER TABLE staff_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE scheduled_send_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE send_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE proof_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_events ENABLE ROW LEVEL SECURITY;

-- Example policy template (customize after wiring auth / JWT claims):
-- CREATE POLICY company_department_isolation ON companies
--   FOR ALL TO authenticated
--   USING (
--     auth.jwt() ->> 'department' = 'admin'
--     OR (departments @> ARRAY[auth.jwt() ->> 'department']::text[])
--   );

-- Updated-at helper trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER companies_updated_at BEFORE UPDATE ON companies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER scheduled_send_jobs_updated_at BEFORE UPDATE ON scheduled_send_jobs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER staff_users_updated_at BEFORE UPDATE ON staff_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
