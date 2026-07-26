import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eqobubucyxgrqllgrrov.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxb2J1YnVjeXhncnFsbGdycm92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzOTI4NzcsImV4cCI6MjA5Nzk2ODg3N30.bHeDi_F3ljTZcfesRXR4q6T5Ixtsr3awusuQpV-rXwM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export type InquiryStatus = 'neu' | 'in_bearbeitung' | 'erledigt';

export interface Inquiry {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  event_date: string | null;
  event_location: string | null;
  package: string;
  message: string | null;
  status: InquiryStatus;
}
