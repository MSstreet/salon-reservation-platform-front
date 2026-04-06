import { apiClient } from './client';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface Designer {
  staffId: number;
  name: string;
  role?: string;
  status?: 'ACTIVE' | 'INACTIVE';
  profileImageUrl?: string | null;
}

export interface Menu {
  menuId: number;
  menuName: string;
  durationMin: number;
  price: number;
}

export const designersApi = {
  getByStore: (storeId: number) =>
    apiClient.get<ApiResponse<Designer[]>>(`/api/stores/${storeId}/designers`).then(res => res.data),

  getMenus: (storeId: number, staffId: number) =>
    apiClient.get<ApiResponse<Menu[]>>(`/api/stores/${storeId}/designers/${staffId}/menus`).then(res => res.data),
};
