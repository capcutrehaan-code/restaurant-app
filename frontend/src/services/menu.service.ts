import { apiService } from './api';
import type { MenuItem, Category } from '@/types';

export const menuService = {
  getCategories: () =>
    apiService.get<Category[]>('/menu/categories'),

  getDishes: (params?: { category?: string; search?: string; isVeg?: boolean }) =>
    apiService.get<MenuItem[]>('/menu/dishes', params),

  getDishById: (id: string) =>
    apiService.get<MenuItem>(`/menu/dishes/${id}`),

  getCombos: () =>
    apiService.get<MenuItem[]>('/menu/combos'),

  searchDishes: (query: string) =>
    apiService.get<MenuItem[]>('/menu/dishes', { search: query }),
};
