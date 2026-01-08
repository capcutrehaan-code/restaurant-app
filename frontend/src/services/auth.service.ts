import { apiService } from './api';
import type { User } from '@/types';

interface SendOtpResponse {
  success: boolean;
  message: string;
}

interface VerifyOtpResponse {
  success: boolean;
  token: string;
  user: User;
}

export const authService = {
  sendOtp: (phone: string) => 
    apiService.post<SendOtpResponse>('/auth/send-otp', { phone }),

  verifyOtp: (phone: string, otp: string) =>
    apiService.post<VerifyOtpResponse>('/auth/verify-otp', { phone, otp }),

  refreshToken: () =>
    apiService.post<{ token: string }>('/auth/refresh-token'),

  logout: () =>
    apiService.post<void>('/auth/logout'),

  getProfile: () =>
    apiService.get<User>('/users/profile'),

  updateProfile: (data: Partial<User>) =>
    apiService.put<User>('/users/profile', data),
};
