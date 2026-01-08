import mongoose, { Document, Schema } from 'mongoose';

export interface IAddress {
  type: 'home' | 'work' | 'other';
  street: string;
  city: string;
  state: string;
  zip: string;
  landmark?: string;
  isDefault: boolean;
}

export interface IWalletTransaction {
  amount: number;
  type: 'credit' | 'debit';
  description: string;
  orderId?: mongoose.Types.ObjectId;
  createdAt: Date;
}

export interface IUser extends Document {
  phone: string;
  email?: string;
  name: string;
  avatar?: string;
  addresses: IAddress[];
  wallet: {
    balance: number;
    history: IWalletTransaction[];
  };
  loyaltyPoints: number;
  createdAt: Date;
  updatedAt: Date;
}

const AddressSchema = new Schema<IAddress>({
  type: { type: String, enum: ['home', 'work', 'other'], required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  landmark: String,
  isDefault: { type: Boolean, default: false },
});

const WalletTransactionSchema = new Schema<IWalletTransaction>({
  amount: { type: Number, required: true },
  type: { type: String, enum: ['credit', 'debit'], required: true },
  description: { type: String, required: true },
  orderId: { type: Schema.Types.ObjectId, ref: 'Order' },
  createdAt: { type: Date, default: Date.now },
});

const UserSchema = new Schema<IUser>(
  {
    phone: { type: String, required: true, unique: true },
    email: { type: String, sparse: true },
    name: { type: String, required: true },
    avatar: String,
    addresses: [AddressSchema],
    wallet: {
      balance: { type: Number, default: 0 },
      history: [WalletTransactionSchema],
    },
    loyaltyPoints: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);
