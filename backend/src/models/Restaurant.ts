import mongoose, { Document, Schema } from 'mongoose';

interface IOperatingHours {
  [key: string]: {
    open: string;
    close: string;
    closed?: boolean;
  };
}

export interface IRestaurant extends Document {
  name: string;
  description: string;
  logo: string;
  rating: number;
  reviewsCount: number;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  phone: string;
  email: string;
  website?: string;
  operatingHours: IOperatingHours;
  cuisines: string[];
  priceRange: 1 | 2 | 3;
  isOpen: boolean;
  isDeliveryAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const RestaurantSchema = new Schema<IRestaurant>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    logo: { type: String, required: true },
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: { type: String, required: true },
    },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    website: String,
    operatingHours: { type: Schema.Types.Mixed, required: true },
    cuisines: [String],
    priceRange: { type: Number, enum: [1, 2, 3], default: 2 },
    isOpen: { type: Boolean, default: true },
    isDeliveryAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IRestaurant>('Restaurant', RestaurantSchema);
