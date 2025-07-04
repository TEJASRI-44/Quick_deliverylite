const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/adminMiddleware');
const User = require('../models/User');
const Delivery = require('../models/Delivery');
const mongoose = require('mongoose');

// Protect all routes with JWT + Admin check
router.use(authenticate, isAdmin);

// Enhanced error handler middleware
router.use((err, req, res, next) => {
  console.error('Admin route error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Get all users (excluding sensitive data)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({})
      .select('-password -googleId -__v')
      .lean();
      
    if (!users || !Array.isArray(users)) {
      return res.status(404).json({ error: 'No users found' });
    }

    res.json(users);
  } catch (err) {
    console.error('Users fetch error:', err);
    res.status(500).json({ 
      error: 'Failed to fetch users',
      details: err.message
    });
  }
});

// Get all deliveries with proper validation
router.get('/deliveries', async (req, res) => {
  try {
    const { status } = req.query;
    const query = {}; // Remove the createdBy filter
    
    if (status) {
      query.status = status;
    }

    const deliveries = await Delivery.find(query)
      .populate('createdBy', 'name email') 
      .populate('acceptedBy', 'name email') 
      .sort({ createdAt: -1 });

    res.json(deliveries);
  } catch (err) {
    console.error('Error fetching deliveries:', err);
    res.status(500).json({ 
      error: 'Server error fetching deliveries',
      details: err.message 
    });
  }
});


router.delete('/users/:id', async (req, res) => {
  try {
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }

    // Prevent admin from deleting themselves
    if (req.user._id.toString() === req.params.id) {
      return res.status(403).json({ error: 'You cannot delete your own admin account' });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Clean up any deliveries associated with this user
    await Delivery.deleteMany({ createdBy: user._id });

    res.json({ 
      success: true,
      message: `User ${user.email} deleted successfully`
    });

  } catch (err) {
    console.error('User deletion error:', err);
    res.status(500).json({ 
      error: 'Failed to delete user',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Delete delivery
router.delete('/deliveries/:id', async (req, res) => {
  try {
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid delivery ID format' });
    }

    const delivery = await Delivery.findByIdAndDelete(req.params.id);
    
    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    res.json({ 
      success: true,
      message: `Delivery ${req.params.id} deleted successfully`
    });

  } catch (err) {
    console.error('Delivery deletion error:', err);
    res.status(500).json({ 
      error: 'Failed to delete delivery',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});



module.exports = router;