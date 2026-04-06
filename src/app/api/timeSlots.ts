import { apiClient } from './client';

export interface TimeSlot {
  id: number;
  startAt: string;
  endAt: string;
  status: 'OPEN' | 'CLOSED' | 'RESERVED';
}

export interface TimeSlotsParams {
  date: string;
  staffId: number;
  menuId?: number;
  status?: string;
}

export const timeSlotsApi = {
  getAvailable: (storeId: number, params: TimeSlotsParams) => {
    const query = new URLSearchParams();
    query.set('date', params.date);
    if (params.staffId) query.set('staffId', String(params.staffId));
    if (params.menuId) query.set('menuId', String(params.menuId));
    if (params.status) query.set('status', params.status);
    return apiClient.get<TimeSlot[]>(`/api/stores/${storeId}/time-slots?${query}`);
  },
};
