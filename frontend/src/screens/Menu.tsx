import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { DishCard } from '@/components/features/DishCard';
import { Badge } from '@/components/ui/Badge';
import { menuService } from '@/services/menu.service';
import { useCartStore } from '@/stores/cartStore';
import type { MenuItem } from '@/types';

export const Menu = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const addItem = useCartStore((state) => state.addItem);
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filterVeg, setFilterVeg] = useState<boolean | null>(null);

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => menuService.getCategories(),
  });

  const { data: dishes, isLoading } = useQuery({
    queryKey: ['dishes', selectedCategory, filterVeg],
    queryFn: () => menuService.getDishes({
      category: selectedCategory || undefined,
      isVeg: filterVeg !== null ? filterVeg : undefined,
    }),
  });

  const filteredDishes = useMemo(() => {
    if (!dishes) return [];
    if (!searchQuery) return dishes;
    
    return dishes.filter((dish) =>
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [dishes, searchQuery]);

  const handleAddToCart = (dish: MenuItem) => {
    addItem({
      dish,
      quantity: 1,
      selectedSize: dish.halfPrice ? 'half' : undefined,
      customizations: [],
    });
  };

  const handleDishClick = (dish: MenuItem) => {
    navigate(`/menu/${dish._id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <header className="bg-white dark:bg-dark-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Our Menu
          </h1>
          
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              size="sm"
              variant={selectedCategory === null ? 'primary' : 'ghost'}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Button>
            {categories?.map((category) => (
              <Button
                key={category._id}
                size="sm"
                variant={selectedCategory === category.slug ? 'primary' : 'ghost'}
                onClick={() => setSelectedCategory(category.slug)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6">
          <Button
            size="sm"
            variant={filterVeg === null ? 'primary' : 'outline'}
            onClick={() => setFilterVeg(null)}
          >
            All
          </Button>
          <Button
            size="sm"
            variant={filterVeg === true ? 'primary' : 'outline'}
            onClick={() => setFilterVeg(true)}
            className="flex items-center gap-1"
          >
            <span className="w-2 h-2 bg-green-600 border border-green-600" />
            Veg Only
          </Button>
          <Button
            size="sm"
            variant={filterVeg === false ? 'primary' : 'outline'}
            onClick={() => setFilterVeg(false)}
            className="flex items-center gap-1"
          >
            <span className="w-2 h-2 bg-red-600 border border-red-600" />
            Non-Veg
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="h-64 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg" />
            ))}
          </div>
        ) : filteredDishes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No dishes found. Try adjusting your filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDishes.map((dish) => (
              <DishCard
                key={dish._id}
                dish={dish}
                onAddToCart={handleAddToCart}
                onCardClick={handleDishClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
