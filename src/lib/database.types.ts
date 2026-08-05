export interface Database {
  public: {
    Tables: {
      staff_users: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      companies: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      company_contacts: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      compliance_rules: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      scheduled_send_jobs: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      send_logs: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      proof_documents: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      audit_events: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> };
    };
  };
}
