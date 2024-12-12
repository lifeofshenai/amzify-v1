export interface PaymentStats {
  balance: number;
  lastWithdrawal: number;
  pending: number;
  allTimeEarnings: number;
  lastWithdrawalDate: string;
  pendingDate: string;
  percentageChange: number;
}

export interface WithdrawalMethod {
  id: string;
  type: 'paypal' | 'bank';
  name: string;
  icon: string;
}

export interface Transaction {
  id: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  method: string;
  commission: number;
}