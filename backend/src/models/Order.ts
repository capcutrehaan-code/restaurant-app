import mongoose, { Document, Schema } from 'mongoose';

export type OrderType = 'dineIn' | 'takeaway' | 'delivery';
export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'outForDelivery' | 'delivered' | 'cancelled';
export type PaymentMethod = 'cash' | 'upi' | 'card' | 'wallet';

interface IOrderItem {
  dishId: mongoose.Types.ObjectId;
  name: string;
  quantity: number;
  price: number;
  selectedSize?: 'half' | 'full';
  customizations?: {
    name: string;
    option: string;
    price: number;
  }[];
}

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  restaurantId: mongoose.Types.ObjectId;
  items: IOrderItem[];
  orderType: OrderType;
  status: OrderStatus;
  deliveryAddress?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    landmark?: string;
  };
  subtotal: number;
  tax: number;
  discount: number;
  deliveryCharge: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'completed' | 'failed';
  orderNotes?: string;
  estimatedDeliveryTime?: Date;
  rating?: number;
  review?: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  dishId: { type: Schema.Types.ObjectId, ref: 'MenuItem', required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  selectedSize: { type: String, enum: ['half', 'full'] },
  customizations: [
    {
      name: String,
      option: String,
      price: Number,
    },
  ],
});

const OrderSchema = new Schema<IOrder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    items: [OrderItemSchema],
    orderType: { type: String, enum: ['dineIn', 'takeaway', 'delivery'], required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'preparing', 'ready', 'outForDelivery', 'delivered', 'cancelled'],
      default: 'pending',
    },
    deliveryAddress: {
      street: String,
      city: String,
      state: String,
      zip: String,
      landmark: String,
    },
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    deliveryCharge: { type: Number, default: 0 },
    total: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['cash', 'upi', 'card', 'wallet'], required: true },
    paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    orderNotes: String,
    estimatedDeliveryTime: Date,
    rating: { type: Number, min: 1, max: 5 },
    review: String,
    completedAt: Date,
  },
  { timestamps: true }
);

OrderSchema.index({ userId: 1, createdAt: -1 });
OrderSchema.index({ restaurantId: 1, status: 1 });

export default mongoose.model<IOrder>('Order', OrderSchema);
