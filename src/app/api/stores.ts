import { apiClient } from './client';

export interface Store {
  id: number;
  name: string;
  address?: string | null;
  phone?: string;
  businessHours?: string;
  description?: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const storesApi = {
  getAll: () => apiClient.get<ApiResponse<Store[]>>('/api/stores').then(res => res.data),
  getById: (storeId: number) => apiClient.get<ApiResponse<Store>>(`/api/stores/${storeId}`).then(res => res.data),
};
