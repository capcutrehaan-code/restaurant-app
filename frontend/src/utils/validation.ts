import { z } from 'zod';

export const phoneSchema = z.string().regex(/^[6-9]\d{9}$/, 'Invalid phone number');

export const emailSchema = z.string().email('Invalid email address');

export const otpSchema = z.string().length(6, 'OTP must be 6 digits');

export const addressSchema = z.object({
  type: z.enum(['home', 'work', 'other']),
  street: z.string().min(5, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zip: z.string().regex(/^\d{6}$/, 'Invalid PIN code'),
  landmark: z.string().optional(),
  isDefault: z.boolean().default(false),
});

export const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: emailSchema.optional(),
  phone: phoneSchema,
});

export const reservationSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  guestCount: z.number().min(1).max(20),
  specialNotes: z.string().optional(),
});

export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, 'Review must be at least 10 characters'),
});
