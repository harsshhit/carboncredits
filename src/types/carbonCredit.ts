export interface CarbonCredit {
  unic_id: string;
  project_name: string;
  vintage: number;
  status: 'Active' | 'Retired';
}

export interface RetirementCertificate {
  unic_id: string;
  project_name: string;
  vintage: number;
  status: string;
  timestamp: string;
}
