
export enum TenderStatus {
  DRAFT = 'Draft',
  OPEN = 'Open',
  EVALUATING = 'Evaluating',
  AWARDED = 'Awarded',
  CANCELLED = 'Cancelled'
}

export type FundSource = 'XVFC-Tied Grant' | 'XVFC-Untied Grant' | 'SFC-TIED' | 'SFC-UNTIED' | 'APAS-2025-26';

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string; // Name of the category
}

export interface Tender {
  id: string;
  // User Requested Fields
  schemeName: string;
  schemeCode: string;
  planYear: string;
  fundName: FundSource;
  estimatedAmount: number;
  tenderAmount: number;
  earnestMoneyAmount: number;
  tenderFees: number;
  tenderMemoNoDate: string;
  nitNo: string;
  nitDate: string;
  nitOpenDate: string;
  workOrderNo: string;
  workOrderDate: string;
  workOrderAmount: number;
  rateOffered: string;
  agencyName: string;
  
  // System Fields
  status: TenderStatus;
  department: string;
  description: string;
}

export interface DashboardStats {
  totalFund: number;
  totalExpenses: number;
  activeTenders: number;
  totalBudgeted: number;
}

export interface User {
  id: string;
  name: string;
  role: 'Admin' | 'Manager' | 'Accountant';
  email: string;
}
