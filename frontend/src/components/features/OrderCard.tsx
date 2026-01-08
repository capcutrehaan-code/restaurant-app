import { format } from 'date-fns';
import { Clock, MapPin, Package } from 'lucide-react';
import type { Order } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatCurrency, formatDateTime } from '@/utils/formatters';

interface OrderCardProps {
  order: Order;
  onViewDetails: (order: Order) => void;
  onTrack?: (order: Order) => void;
  onReorder?: (order: Order) => void;
}

const statusColors: Record<string, 'info' | 'warning' | 'success' | 'error'> = {
  pending: 'warning',
  confirmed: 'info',
  preparing: 'info',
  ready: 'success',
  outForDelivery: 'info',
  delivered: 'success',
  cancelled: 'error',
};

const statusLabels: Record<string, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  preparing: 'Preparing',
  ready: 'Ready',
  outForDelivery: 'Out for Delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

export const OrderCard = ({ order, onViewDetails, onTrack, onReorder }: OrderCardProps) => {
  return (
    <Card className="hover:shadow-medium transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Order #{order._id.slice(-8)}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              {formatDateTime(order.createdAt)}
            </p>
          </div>
          <Badge variant={statusColors[order.status]}>
            {statusLabels[order.status]}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Package className="w-4 h-4" />
          <span>{order.items.length} items</span>
          <span className="ml-auto font-bold text-gray-900 dark:text-white">
            {formatCurrency(order.total)}
          </span>
        </div>

        {order.orderType === 'delivery' && order.deliveryAddress && (
          <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="w-4 h-4 mt-0.5" />
            <span className="line-clamp-1">
              {order.deliveryAddress.street}, {order.deliveryAddress.city}
            </span>
          </div>
        )}

        {order.estimatedDeliveryTime && (
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            <span>Est. delivery: {format(new Date(order.estimatedDeliveryTime), 'hh:mm a')}</span>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={() => onViewDetails(order)} className="flex-1">
            View Details
          </Button>
          {order.status === 'outForDelivery' && onTrack && (
            <Button size="sm" onClick={() => onTrack(order)} className="flex-1">
              Track Order
            </Button>
          )}
          {order.status === 'delivered' && onReorder && (
            <Button size="sm" onClick={() => onReorder(order)} className="flex-1">
              Reorder
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
