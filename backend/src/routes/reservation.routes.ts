import express from 'express';
import mongoose, { Document, Schema } from 'mongoose';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = express.Router();

interface IReservation extends Document {
  userId: mongoose.Types.ObjectId;
  restaurantId: mongoose.Types.ObjectId;
  date: string;
  time: string;
  guestCount: number;
  tableId?: string;
  specialNotes?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const ReservationSchema = new Schema<IReservation>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    guestCount: { type: Number, required: true },
    tableId: String,
    specialNotes: String,
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  },
  { timestamps: true }
);

const Reservation = mongoose.model<IReservation>('Reservation', ReservationSchema);

router.post('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const reservationData = {
      ...req.body,
      userId: req.userId,
      restaurantId: process.env.DEFAULT_RESTAURANT_ID || '000000000000000000000000',
    };

    const reservation = await Reservation.create(reservationData);
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create reservation' });
  }
});

router.get('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const reservations = await Reservation.find({ userId: req.userId }).sort({ date: -1, time: -1 });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch reservations' });
  }
});

router.get('/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const reservation = await Reservation.findOne({ _id: req.params.id, userId: req.userId });
    
    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }

    res.json(reservation);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch reservation' });
  }
});

router.put('/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const reservation = await Reservation.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }

    res.json(reservation);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update reservation' });
  }
});

router.delete('/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const reservation = await Reservation.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { $set: { status: 'cancelled' } },
      { new: true }
    );

    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }

    res.json({ success: true, message: 'Reservation cancelled' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to cancel reservation' });
  }
});

router.get('/tables/available', async (req, res) => {
  try {
    const { date, time, guestCount } = req.query;
    
    res.json({ available: true, availableTables: 5 });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to check availability' });
  }
});

export default router;
