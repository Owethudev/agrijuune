import type { EnquiryServiceId } from '../../validation/enquiry-validation.js';

type EnquiryStatus = 'new' | 'contacted' | 'closed';
type NotificationStatus = 'pending' | 'sent' | 'failed' | 'not_configured';

type EnquiryRow = {
  id: string;
  contact_name: string;
  email: string;
  cell_number: string;
  farm_name: string | null;
  farm_location: string | null;
  operation_type: string | null;
  machine_count_estimate: number | null;
  services_of_interest: EnquiryServiceId[];
  additional_message: string | null;
  privacy_notice_version: string | null;
  privacy_acknowledged_at: string | null;
  created_at: string;
  notification_status: NotificationStatus;
  notification_attempted_at: string | null;
  status: EnquiryStatus;
  idempotency_key_hash: string | null;
  idempotency_request_hash: string | null;
};

type EnquiryInsert = {
  id?: string;
  contact_name: string;
  email: string;
  cell_number: string;
  farm_name?: string | null;
  farm_location?: string | null;
  operation_type?: string | null;
  machine_count_estimate?: number | null;
  services_of_interest: EnquiryServiceId[];
  additional_message?: string | null;
  privacy_notice_version?: string | null;
  privacy_acknowledged_at?: string | null;
  created_at?: string;
  notification_status?: NotificationStatus;
  notification_attempted_at?: string | null;
  status?: EnquiryStatus;
  idempotency_key_hash?: string | null;
  idempotency_request_hash?: string | null;
};

export type Database = {
  public: {
    Tables: {
      enquiries: {
        Row: EnquiryRow;
        Insert: EnquiryInsert;
        Update: Partial<EnquiryInsert>;
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};
