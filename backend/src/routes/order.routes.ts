import express from 'express';
import Order from '../models/Order';
import { authenticate, AuthRequest } from '../middleware/auth';
import { io } from '../index';

const router = express.Router();

router.post('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const orderData = {
      ...req.body,
      userId: req.userId,
      restaurantId: process.env.DEFAULT_RESTAURANT_ID || '000000000000000000000000',
    };

    const order = await Order.create(orderData);

    io.to(`order:${order._id}`).emit('orderUpdate', { orderId: order._id, status: order.status });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create order' });
  }
});

router.get('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    const query: any = { userId: req.userId };
    
    if (status) {
      query.status = status;
    }

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Order.countDocuments(query);

    res.json({ orders, total });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  }
});

router.get('/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, userId: req.userId });
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch order' });
  }
});

router.put('/:id/cancel', authenticate, async (req: AuthRequest, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, userId: req.userId });
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (order.status !== 'pending' && order.status !== 'confirmed') {
      return res.status(400).json({ success: false, message: 'Cannot cancel order at this stage' });
    }

    order.status = 'cancelled';
    await order.save();

    io.to(`order:${order._id}`).emit('orderUpdate', { orderId: order._id, status: 'cancelled' });

    res.json(order);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to cancel order' });
  }
});

router.get('/:id/track', authenticate, async (req: AuthRequest, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, userId: req.userId });
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({
      status: order.status,
      estimatedDeliveryTime: order.estimatedDeliveryTime,
      location: { lat: 0, lng: 0 },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to track order' });
  }
});

router.post('/:id/rate', authenticate, async (req: AuthRequest, res) => {
  try {
    const { rating, review } = req.body;

    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { $set: { rating, review } },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, message: 'Rating submitted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to rate order' });
  }
});

router.post('/:id/reorder', authenticate, async (req: AuthRequest, res) => {
  try {
    const originalOrder = await Order.findOne({ _id: req.params.id, userId: req.userId });
    
    if (!originalOrder) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const newOrder = await Order.create({
      userId: req.userId,
      restaurantId: originalOrder.restaurantId,
      items: originalOrder.items,
      orderType: originalOrder.orderType,
      subtotal: originalOrder.subtotal,
      tax: originalOrder.tax,
      deliveryCharge: originalOrder.deliveryCharge,
      total: originalOrder.total,
      paymentMethod: originalOrder.paymentMethod,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to reorder' });
  }
});

export default router;
