import { Minus, Plus, Trash2 } from 'lucide-react';
import type { CartItem as CartItemType } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/utils/formatters';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (dishId: string, quantity: number) => void;
  onRemove: (dishId: string) => void;
}

export const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
  const price = item.selectedSize === 'half'
    ? (item.dish.halfPrice || item.dish.price)
    : (item.dish.fullPrice || item.dish.price);

  const customizationPrice = item.customizations?.reduce((sum, c) => sum + c.price, 0) || 0;
  const totalPrice = (price + customizationPrice) * item.quantity;

  return (
    <div className="flex gap-4 p-4 bg-white dark:bg-dark-800 rounded-lg shadow-card">
      <img
        src={item.dish.image}
        alt={item.dish.name}
        className="w-20 h-20 object-cover rounded-lg"
      />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant={item.dish.isVeg ? 'veg' : 'non-veg'} />
              <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                {item.dish.name}
              </h3>
            </div>
            {item.selectedSize && (
              <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                {item.selectedSize}
              </p>
            )}
            {item.customizations && item.customizations.length > 0 && (
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {item.customizations.map(c => c.option).join(', ')}
              </p>
            )}
          </div>
          <button
            onClick={() => onRemove(item.dish._id)}
            className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-lg">
            <button
              onClick={() => onUpdateQuantity(item.dish._id, item.quantity - 1)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-lg transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-3 font-semibold">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.dish._id, item.quantity + 1)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <span className="font-bold text-lg text-primary">
            {formatCurrency(totalPrice)}
          </span>
        </div>
      </div>
    </div>
  );
};
