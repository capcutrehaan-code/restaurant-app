import { LogOut, Moon, Sun, User as UserIcon, MapPin, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/stores/authStore';
import { useThemeStore } from '@/stores/themeStore';
import { formatCurrency } from '@/utils/formatters';

export const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();

  const handleLogout = async () => {
    await logout();
    navigate('/auth/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <header className="bg-white dark:bg-dark-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Profile
          </h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {user.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{user.phone}</p>
              {user.email && (
                <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
              )}
            </div>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Wallet className="w-5 h-5 text-primary" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Wallet Balance</p>
                <p className="text-2xl font-bold text-primary">
                  {formatCurrency(user.wallet?.balance || 0)}
                </p>
              </div>
            </div>
            <Button size="sm">Add Money</Button>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎁</span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Loyalty Points</p>
                <p className="text-2xl font-bold text-accent">
                  {user.loyaltyPoints || 0}
                </p>
              </div>
            </div>
            <Button size="sm" variant="outline">
              Redeem
            </Button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Earn points with every order and redeem for discounts!
          </p>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-3">
            <MapPin className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Saved Addresses</h3>
          </div>
          {user.addresses && user.addresses.length > 0 ? (
            <div className="space-y-2">
              {user.addresses.map((address, index) => (
                <div
                  key={index}
                  className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white capitalize">
                        {address.type}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {address.street}, {address.city} - {address.zip}
                      </p>
                    </div>
                    {address.isDefault && (
                      <span className="text-xs bg-primary text-white px-2 py-1 rounded">
                        Default
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No saved addresses</p>
          )}
          <Button variant="outline" size="sm" className="w-full mt-3">
            Add New Address
          </Button>
        </Card>

        <Card>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Settings</h3>
          <div className="space-y-2">
            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                {theme === 'dark' ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
                <span>Dark Mode</span>
              </div>
              <div className={`w-12 h-6 rounded-full transition-colors ${
                theme === 'dark' ? 'bg-primary' : 'bg-gray-300'
              }`}>
                <div className={`w-5 h-5 bg-white rounded-full transition-transform m-0.5 ${
                  theme === 'dark' ? 'translate-x-6' : ''
                }`} />
              </div>
            </button>
          </div>
        </Card>

        <Button
          variant="outline"
          className="w-full text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};
