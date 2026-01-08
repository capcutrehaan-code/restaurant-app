import { useState } from 'react';
import { Plus, Star } from 'lucide-react';
import type { MenuItem } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { formatCurrency } from '@/utils/formatters';
import { cn } from '@/utils/cn';

interface DishCardProps {
  dish: MenuItem;
  onAddToCart: (dish: MenuItem) => void;
  onCardClick: (dish: MenuItem) => void;
}

export const DishCard = ({ dish, onAddToCart, onCardClick }: DishCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(dish);
  };

  return (
    <Card
      className="group cursor-pointer hover:shadow-medium transition-shadow duration-200"
      onClick={() => onCardClick(dish)}
    >
      <div className="relative aspect-video overflow-hidden rounded-lg mb-3">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
        )}
        <img
          src={dish.image}
          alt={dish.name}
          className={cn(
            'w-full h-full object-cover group-hover:scale-105 transition-transform duration-200',
            !imageLoaded && 'opacity-0'
          )}
          onLoad={() => setImageLoaded(true)}
        />
        {!dish.isAvailable && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">Not Available</span>
          </div>
        )}
        <div className="absolute top-2 left-2">
          <Badge variant={dish.isVeg ? 'veg' : 'non-veg'}>
            {dish.isVeg ? 'Veg' : 'Non-Veg'}
          </Badge>
        </div>
        {dish.rating && (
          <div className="absolute top-2 right-2 bg-white dark:bg-dark-800 px-2 py-1 rounded-lg flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold">{dish.rating.toFixed(1)}</span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white line-clamp-1">
          {dish.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {dish.description}
        </p>
        
        <div className="flex items-center justify-between pt-2">
          <div>
            {dish.halfPrice && dish.fullPrice ? (
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Half: {formatCurrency(dish.halfPrice)}</span>
                <span className="text-xs text-gray-500">Full: {formatCurrency(dish.fullPrice)}</span>
              </div>
            ) : (
              <span className="text-lg font-bold text-primary">
                {formatCurrency(dish.price)}
              </span>
            )}
          </div>
          
          <Button
            size="sm"
            onClick={handleAddClick}
            disabled={!dish.isAvailable}
            className="flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>
      </div>
    </Card>
  );
};
