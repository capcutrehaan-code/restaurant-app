import { apiService } from './api';
import type { Order, OrderType } from '@/types';

interface CreateOrderData {
  items: any[];
  orderType: OrderType;
  deliveryAddress?: string;
  paymentMethod: string;
  orderNotes?: string;
  couponCode?: string;
}

export const orderService = {
  createOrder: (data: CreateOrderData) =>
    apiService.post<Order>('/orders', data),

  getOrders: (params?: { page?: number; limit?: number; status?: string }) =>
    apiService.get<{ orders: Order[]; total: number }>('/orders', params),

  getOrderById: (id: string) =>
    apiService.get<Order>(`/orders/${id}`),

  cancelOrder: (id: string, reason?: string) =>
    apiService.put<Order>(`/orders/${id}/cancel`, { reason }),

  trackOrder: (id: string) =>
    apiService.get<{ status: string; location?: { lat: number; lng: number } }>(`/orders/${id}/track`),

  rateOrder: (id: string, rating: number, review?: string, images?: string[]) =>
    apiService.post<void>(`/orders/${id}/rate`, { rating, review, images }),

  reorder: (orderId: string) =>
    apiService.post<Order>(`/orders/${orderId}/reorder`),
};
