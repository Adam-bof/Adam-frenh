export interface DocumentRequest {
  id: string;
  title: string;
  category: 'bank_statement' | 'credit_card' | 'payroll' | 'invoice' | 'tax';
  dueDate: string;
  status: 'pending' | 'uploaded' | 'verified';
  note?: string;
  uploadedAt?: string;
  fileName?: string;
  fileSize?: string;
}

export interface ClientProfile {
  id: string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  closingMonth: string;
  magicToken: string;
  driveFolder: string;
}

export interface FounderReservation {
  id: string;
  fullName: string;
  email: string;
  firmName: string;
  firmSize: 'solo' | '2-5' | '6+';
  currentMethod: 'sheets_email' | 'keeper' | 'content_snare' | 'drive_manual' | 'other';
  planTier: 'founder-monthly' | 'founder-annual';
  timestamp: string;
  reservationNumber: number;
}
