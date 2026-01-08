import { apiService } from './api';
import type { Reservation } from '@/types';

interface CreateReservationData {
  date: string;
  time: string;
  guestCount: number;
  specialNotes?: string;
}

export const reservationService = {
  createReservation: (data: CreateReservationData) =>
    apiService.post<Reservation>('/reservations', data),

  getReservations: () =>
    apiService.get<Reservation[]>('/reservations'),

  getReservationById: (id: string) =>
    apiService.get<Reservation>(`/reservations/${id}`),

  updateReservation: (id: string, data: Partial<CreateReservationData>) =>
    apiService.put<Reservation>(`/reservations/${id}`, data),

  cancelReservation: (id: string) =>
    apiService.delete<void>(`/reservations/${id}`),

  checkAvailability: (date: string, time: string, guestCount: number) =>
    apiService.get<{ available: boolean; availableTables: number }>('/tables/available', {
      date,
      time,
      guestCount,
    }),
};
