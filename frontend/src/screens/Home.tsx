import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Phone, Calendar, ShoppingBag, Star, Clock } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { DishCard } from '@/components/features/DishCard';
import { menuService } from '@/services/menu.service';
import { useCartStore } from '@/stores/cartStore';
import type { MenuItem } from '@/types';

export const Home = () => {
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: topDishes, isLoading } = useQuery({
    queryKey: ['top-dishes'],
    queryFn: () => menuService.getDishes({ category: 'chef-specials' }),
  });

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

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/menu?search=${searchQuery}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <header className="bg-white dark:bg-dark-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                The Royal Kitchen
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold">4.5</span>
                <span className="text-sm text-gray-500">(2,500+ reviews)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-sm">
                <Clock className="w-4 h-4 text-green-500" />
                <span className="text-green-600 dark:text-green-400 font-semibold">Open</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search for dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10"
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4"
            onClick={() => navigate('/menu')}
          >
            <ShoppingBag className="w-6 h-6 text-primary" />
            <span>Order Now</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4"
            onClick={() => navigate('/menu')}
          >
            <ShoppingBag className="w-6 h-6 text-secondary" />
            <span>Menu</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4"
            onClick={() => navigate('/reservations/new')}
          >
            <Calendar className="w-6 h-6 text-accent" />
            <span>Book Table</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4"
          >
            <Phone className="w-6 h-6 text-green" />
            <span>Call Us</span>
          </Button>
        </section>

        <section className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Special Offer!</h2>
          <p className="mb-4">Get 20% off on orders above ₹500</p>
          <Button variant="outline" className="bg-white text-primary hover:bg-gray-100">
            Order Now
          </Button>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Chef's Special
            </h2>
            <Button variant="ghost" onClick={() => navigate('/menu')}>
              View All
            </Button>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="h-64 animate-pulse bg-gray-200 dark:bg-gray-700" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {topDishes?.slice(0, 6).map((dish) => (
                <DishCard
                  key={dish._id}
                  dish={dish}
                  onAddToCart={handleAddToCart}
                  onCardClick={handleDishClick}
                />
              ))}
            </div>
          )}
        </section>

        <section className="grid md:grid-cols-2 gap-4">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              Dine-In Experience
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Enjoy our premium dining with live music on weekends
            </p>
            <Button onClick={() => navigate('/reservations/new')}>
              Reserve Table
            </Button>
          </Card>
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              Home Delivery
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Free delivery on orders above ₹500
            </p>
            <Button onClick={() => navigate('/menu')}>
              Order Online
            </Button>
          </Card>
        </section>
      </main>
    </div>
  );
};
