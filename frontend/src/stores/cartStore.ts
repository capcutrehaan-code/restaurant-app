import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, MenuItem, OrderType } from '@/types';

interface CartState {
  items: CartItem[];
  orderType: OrderType;
  couponCode: string | null;
  discount: number;
  addItem: (item: CartItem) => void;
  removeItem: (dishId: string) => void;
  updateQuantity: (dishId: string, quantity: number) => void;
  clearCart: () => void;
  setOrderType: (type: OrderType) => void;
  applyCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;
  getSubtotal: () => number;
  getTax: () => number;
  getDeliveryCharge: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      orderType: 'delivery',
      couponCode: null,
      discount: 0,

      addItem: (newItem) => {
        const items = get().items;
        const existingIndex = items.findIndex(
          (item) =>
            item.dish._id === newItem.dish._id &&
            item.selectedSize === newItem.selectedSize &&
            JSON.stringify(item.customizations) === JSON.stringify(newItem.customizations)
        );

        if (existingIndex >= 0) {
          const updatedItems = [...items];
          updatedItems[existingIndex].quantity += newItem.quantity;
          set({ items: updatedItems });
        } else {
          set({ items: [...items, newItem] });
        }
      },

      removeItem: (dishId) => {
        set({ items: get().items.filter((item) => item.dish._id !== dishId) });
      },

      updateQuantity: (dishId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(dishId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.dish._id === dishId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [], couponCode: null, discount: 0 });
      },

      setOrderType: (type) => {
        set({ orderType: type });
      },

      applyCoupon: (code, discount) => {
        set({ couponCode: code, discount });
      },

      removeCoupon: () => {
        set({ couponCode: null, discount: 0 });
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => {
          const price = item.selectedSize === 'half' 
            ? (item.dish.halfPrice || item.dish.price)
            : (item.dish.fullPrice || item.dish.price);
          
          const customizationPrice = item.customizations?.reduce(
            (sum, c) => sum + c.price,
            0
          ) || 0;

          return total + (price + customizationPrice) * item.quantity;
        }, 0);
      },

      getTax: () => {
        return get().getSubtotal() * 0.18;
      },

      getDeliveryCharge: () => {
        const orderType = get().orderType;
        if (orderType === 'delivery') {
          const subtotal = get().getSubtotal();
          return subtotal > 500 ? 0 : 40;
        }
        return 0;
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const tax = get().getTax();
        const deliveryCharge = get().getDeliveryCharge();
        const discount = get().discount;
        return subtotal + tax + deliveryCharge - discount;
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
