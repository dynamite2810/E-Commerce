export interface IPaymentRequest {
  id: string;
  point: number;
  status: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  wallet: {
    id: string;
    userId: string;
    point: 0;
    bankName: string;
    accountNumber: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
  };
}
