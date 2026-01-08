import express from 'express';
import User from '../models/User';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = express.Router();

router.get('/profile', authenticate, async (req: AuthRequest, res) => {
  try {
    const user = await User.findById(req.userId).select('-__v');
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch profile' });
  }
});

router.put('/profile', authenticate, async (req: AuthRequest, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { $set: { name, email } },
      { new: true, runValidators: true }
    );

    res.json(user);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update profile' });
  }
});

router.post('/addresses', authenticate, async (req: AuthRequest, res) => {
  try {
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (req.body.isDefault) {
      user.addresses.forEach((addr) => (addr.isDefault = false));
    }

    user.addresses.push(req.body);
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add address' });
  }
});

router.get('/addresses', authenticate, async (req: AuthRequest, res) => {
  try {
    const user = await User.findById(req.userId).select('addresses');
    res.json(user?.addresses || []);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch addresses' });
  }
});

router.put('/addresses/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const address = user.addresses.id(req.params.id);
    
    if (!address) {
      return res.status(404).json({ success: false, message: 'Address not found' });
    }

    if (req.body.isDefault) {
      user.addresses.forEach((addr) => (addr.isDefault = false));
    }

    Object.assign(address, req.body);
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update address' });
  }
});

router.delete('/addresses/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.addresses.pull(req.params.id);
    await user.save();

    res.json({ success: true, message: 'Address deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete address' });
  }
});

export default router;
