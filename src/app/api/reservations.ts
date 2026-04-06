import { apiClient } from './client';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export type ReservationStatus =
  | 'REQUESTED'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'NO_SHOW';

export interface Reservation {
  id: number;
  storeId: number;
  staffId: number;
  staffName: string;
  menuId: number;
  menuName: string;
  slotId: number;
  startAt: string;
  endAt: string;
  status: ReservationStatus;
  customerName: string;
  createdAt: string;
  depositId?: number;
}

export interface CreateReservationRequest {
  staffId: number;
  menuId: number;
  slotId: number;
  customerName: string;
  customerPhone: string;
}

export const reservationsApi = {
  getAll: (storeId: number) =>
    apiClient.get<ApiResponse<Reservation[]>>(`/api/stores/${storeId}/reservations`).then(res => res.data),

  getById: (storeId: number, reservationId: number) =>
    apiClient.get<ApiResponse<Reservation>>(`/api/stores/${storeId}/reservations/${reservationId}`).then(res => res.data),

  create: (storeId: number, body: CreateReservationRequest) =>
    apiClient.post<ApiResponse<Reservation>>(`/api/stores/${storeId}/reservations`, body).then(res => res.data),

  cancel: (storeId: number, reservationId: number, reason: string) =>
    apiClient.post<void>(
      `/api/stores/${storeId}/reservations/${reservationId}/cancel`,
      { reason }
    ),
};

// localStorage에 예약 참조 저장/관리
export interface ReservationRef {
  storeId: number;
  reservationId: number;
}

const STORAGE_KEY = 'reservationRefs';

export function saveReservationRef(ref: ReservationRef) {
  const existing: ReservationRef[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  existing.unshift(ref);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

export function getReservationRefs(): ReservationRef[] {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

export function removeReservationRef(reservationId: number) {
  const existing = getReservationRefs().filter((r) => r.reservationId !== reservationId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}
