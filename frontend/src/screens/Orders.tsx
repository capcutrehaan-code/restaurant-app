import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Package } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { OrderCard } from '@/components/features/OrderCard';
import { orderService } from '@/services/order.service';
import type { Order, OrderStatus } from '@/types';

export const Orders = () => {
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');

  const { data, isLoading } = useQuery({
    queryKey: ['orders', statusFilter],
    queryFn: () => orderService.getOrders({
      status: statusFilter !== 'all' ? statusFilter : undefined,
    }),
  });

  const handleViewDetails = (order: Order) => {
    console.log('View order details:', order);
  };

  const handleTrack = (order: Order) => {
    console.log('Track order:', order);
  };

  const handleReorder = async (order: Order) => {
    try {
      await orderService.reorder(order._id);
    } catch (error) {
      console.error('Reorder failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <header className="bg-white dark:bg-dark-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            My Orders
          </h1>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              size="sm"
              variant={statusFilter === 'all' ? 'primary' : 'ghost'}
              onClick={() => setStatusFilter('all')}
            >
              All
            </Button>
            <Button
              size="sm"
              variant={statusFilter === 'pending' ? 'primary' : 'ghost'}
              onClick={() => setStatusFilter('pending')}
            >
              Pending
            </Button>
            <Button
              size="sm"
              variant={statusFilter === 'confirmed' ? 'primary' : 'ghost'}
              onClick={() => setStatusFilter('confirmed')}
            >
              Active
            </Button>
            <Button
              size="sm"
              variant={statusFilter === 'delivered' ? 'primary' : 'ghost'}
              onClick={() => setStatusFilter('delivered')}
            >
              Completed
            </Button>
            <Button
              size="sm"
              variant={statusFilter === 'cancelled' ? 'primary' : 'ghost'}
              onClick={() => setStatusFilter('cancelled')}
            >
              Cancelled
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-48 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg" />
            ))}
          </div>
        ) : data?.orders && data.orders.length > 0 ? (
          <div className="space-y-4">
            {data.orders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                onViewDetails={handleViewDetails}
                onTrack={handleTrack}
                onReorder={handleReorder}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No orders yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start ordering to see your history here
            </p>
            <Button onClick={() => window.location.href = '/menu'}>
              Browse Menu
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
