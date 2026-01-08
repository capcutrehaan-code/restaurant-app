import express from 'express';
import MenuItem from '../models/MenuItem';

const router = express.Router();

router.get('/categories', async (req, res) => {
  try {
    const categories = await MenuItem.distinct('category');
    
    const categoryList = categories.map((cat, index) => ({
      _id: cat,
      name: cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' '),
      slug: cat,
      sortOrder: index,
    }));

    res.json(categoryList);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch categories' });
  }
});

router.get('/dishes', async (req, res) => {
  try {
    const { category, search, isVeg } = req.query;
    
    const query: any = {};
    
    if (category) {
      query.category = category;
    }
    
    if (isVeg !== undefined) {
      query.isVeg = isVeg === 'true';
    }
    
    if (search) {
      query.$text = { $search: search as string };
    }

    const dishes = await MenuItem.find(query).sort({ createdAt: -1 });

    res.json(dishes);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch dishes' });
  }
});

router.get('/dishes/:id', async (req, res) => {
  try {
    const dish = await MenuItem.findById(req.params.id);
    
    if (!dish) {
      return res.status(404).json({ success: false, message: 'Dish not found' });
    }

    res.json(dish);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch dish' });
  }
});

router.get('/combos', async (req, res) => {
  try {
    const combos = await MenuItem.find({ category: 'combos' });
    res.json(combos);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch combos' });
  }
});

export default router;
