import express from 'express';
import mongoose, { Document, Schema } from 'mongoose';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = express.Router();

interface IReview extends Document {
  userId: mongoose.Types.ObjectId;
  restaurantId: mongoose.Types.ObjectId;
  orderId?: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  images: string[];
  helpfulCount: number;
  restaurantReply?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    orderId: { type: Schema.Types.ObjectId, ref: 'Order' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    images: [String],
    helpfulCount: { type: Number, default: 0 },
    restaurantReply: String,
  },
  { timestamps: true }
);

const Review = mongoose.model<IReview>('Review', ReviewSchema);

router.post('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const reviewData = {
      ...req.body,
      userId: req.userId,
      restaurantId: process.env.DEFAULT_RESTAURANT_ID || '000000000000000000000000',
    };

    const review = await Review.create(reviewData);
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create review' });
  }
});

router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, rating } = req.query;
    
    const query: any = {};
    
    if (rating) {
      query.rating = Number(rating);
    }

    const reviews = await Review.find(query)
      .populate('userId', 'name avatar')
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch reviews' });
  }
});

router.put('/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const review = await Review.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { $set: { rating: req.body.rating, comment: req.body.comment, images: req.body.images } },
      { new: true, runValidators: true }
    );

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    res.json(review);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update review' });
  }
});

router.delete('/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const review = await Review.findOneAndDelete({ _id: req.params.id, userId: req.userId });

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    res.json({ success: true, message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete review' });
  }
});

export default router;
