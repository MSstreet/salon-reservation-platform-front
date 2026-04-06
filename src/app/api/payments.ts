import { apiClient } from './client';

export interface PaymentResponse {
  id: number;
  status: string;
}

export const paymentsApi = {
  payDeposit: (depositId: number, pgTransactionId: string) =>
    apiClient.post<PaymentResponse>(`/api/payments/deposits/${depositId}`, {
      pgTransactionId,
    }),
};
