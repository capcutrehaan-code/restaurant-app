import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Tag } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { CartItem } from '@/components/features/CartItem';
import { useCartStore } from '@/stores/cartStore';
import { formatCurrency } from '@/utils/formatters';
import type { OrderType } from '@/types';

export const Cart = () => {
  const navigate = useNavigate();
  const {
    items,
    orderType,
    couponCode,
    updateQuantity,
    removeItem,
    setOrderType,
    applyCoupon,
    removeCoupon,
    getSubtotal,
    getTax,
    getDeliveryCharge,
    getTotal,
  } = useCartStore();

  const [couponInput, setCouponInput] = useState('');
  const [cookingInstructions, setCookingInstructions] = useState('');

  const handleApplyCoupon = () => {
    if (couponInput.trim()) {
      applyCoupon(couponInput, 50);
      setCouponInput('');
    }
  };

  const handleCheckout = () => {
    navigate('/checkout', { state: { cookingInstructions } });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Add some delicious items to get started
          </p>
          <Button onClick={() => navigate('/menu')}>
            Browse Menu
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <header className="bg-white dark:bg-dark-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Your Cart ({items.length} items)
          </h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <h2 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">
                Order Type
              </h2>
              <div className="grid grid-cols-3 gap-2">
                {(['dineIn', 'takeaway', 'delivery'] as OrderType[]).map((type) => (
                  <Button
                    key={type}
                    variant={orderType === type ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setOrderType(type)}
                  >
                    {type === 'dineIn' ? 'Dine-In' : type === 'takeaway' ? 'Takeaway' : 'Delivery'}
                  </Button>
                ))}
              </div>
            </Card>

            <div className="space-y-3">
              {items.map((item) => (
                <CartItem
                  key={`${item.dish._id}-${item.selectedSize}`}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>

            <Card>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                Cooking Instructions
              </h3>
              <textarea
                value={cookingInstructions}
                onChange={(e) => setCookingInstructions(e.target.value)}
                placeholder="Any special requests? (e.g., less spicy, no onions)"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                rows={3}
              />
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <h2 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">
                Bill Summary
              </h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="font-semibold">{formatCurrency(getSubtotal())}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">GST (18%)</span>
                  <span className="font-semibold">{formatCurrency(getTax())}</span>
                </div>
                {orderType === 'delivery' && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Delivery Charge</span>
                    <span className="font-semibold">
                      {getDeliveryCharge() === 0 ? 'FREE' : formatCurrency(getDeliveryCharge())}
                    </span>
                  </div>
                )}
                {couponCode && (
                  <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                    <span>Discount ({couponCode})</span>
                    <span className="font-semibold">-{formatCurrency(50)}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <div className="flex justify-between">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-lg text-primary">
                      {formatCurrency(getTotal())}
                    </span>
                  </div>
                </div>
              </div>

              {!couponCode ? (
                <div className="mb-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter coupon code"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    />
                    <Button size="sm" onClick={handleApplyCoupon}>
                      Apply
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="mb-4 flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <Tag className="w-4 h-4" />
                    <span className="text-sm font-semibold">{couponCode} applied</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-red-600 dark:text-red-400 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              )}

              <Button className="w-full" size="lg" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
