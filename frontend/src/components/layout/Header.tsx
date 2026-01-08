import { Link } from 'react-router-dom';
import { ShoppingCart, Moon, Sun } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { useThemeStore } from '@/stores/themeStore';
import { Button } from '@/components/ui/Button';

export const Header = () => {
  const itemCount = useCartStore((state) => state.getItemCount());
  const { theme, toggleTheme } = useThemeStore();

  return (
    <header className="hidden md:block bg-white dark:bg-dark-800 shadow-sm sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">
            The Royal Kitchen
          </Link>

          <nav className="flex items-center gap-6">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/menu" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
              Menu
            </Link>
            <Link to="/orders" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
              Orders
            </Link>
            <Link to="/profile" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
              Profile
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>

            <Link to="/cart" className="relative">
              <Button variant="ghost" size="sm">
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
