import { apiClient } from './client';

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface MockLoginRequest {
  userId: number;
  role: 'CUSTOMER' | 'ADMIN' | 'STORE_ADMIN';
  storeId: number | null;
}

export const authApi = {
  login: (body: LoginRequest) =>
    apiClient.post<TokenResponse>('/auth/login', body),

  mockLogin: (body: MockLoginRequest) =>
    apiClient.post<TokenResponse>('/auth/mock-login', body),

  refresh: (refreshToken: string) =>
    apiClient.post<TokenResponse>('/auth/refresh', { refreshToken }),

  logout: (refreshToken: string) =>
    apiClient.post<void>('/auth/logout', { refreshToken }),
};

export function saveTokens(tokens: TokenResponse) {
  localStorage.setItem('accessToken', tokens.accessToken);
  localStorage.setItem('refreshToken', tokens.refreshToken);
}

export function clearTokens() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

export function isLoggedIn(): boolean {
  return !!localStorage.getItem('accessToken');
}
