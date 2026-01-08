import mongoose, { Document, Schema } from 'mongoose';

interface ICustomization {
  name: string;
  options: {
    name: string;
    price: number;
  }[];
  required?: boolean;
}

export interface IMenuItem extends Document {
  restaurantId: mongoose.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  halfPrice?: number;
  fullPrice?: number;
  image: string;
  category: string;
  isVeg: boolean;
  isJain: boolean;
  ingredients?: string[];
  calories?: number;
  spiceLevel?: 1 | 2 | 3;
  customizations?: ICustomization[];
  isAvailable: boolean;
  rating?: number;
  reviewsCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

const CustomizationSchema = new Schema<ICustomization>({
  name: { type: String, required: true },
  options: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
  required: { type: Boolean, default: false },
});

const MenuItemSchema = new Schema<IMenuItem>(
  {
    restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    halfPrice: Number,
    fullPrice: Number,
    image: { type: String, required: true },
    category: { type: String, required: true },
    isVeg: { type: Boolean, default: true },
    isJain: { type: Boolean, default: false },
    ingredients: [String],
    calories: Number,
    spiceLevel: { type: Number, enum: [1, 2, 3] },
    customizations: [CustomizationSchema],
    isAvailable: { type: Boolean, default: true },
    rating: Number,
    reviewsCount: Number,
  },
  { timestamps: true }
);

MenuItemSchema.index({ name: 'text', description: 'text' });
MenuItemSchema.index({ category: 1, isVeg: 1 });

export default mongoose.model<IMenuItem>('MenuItem', MenuItemSchema);
