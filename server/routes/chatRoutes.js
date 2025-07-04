const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

router.get('/:deliveryId', async (req, res) => {
  try {
    console.log("📨 Getting messages for delivery:", req.params.deliveryId);
    const messages = await Message.find({ deliveryId: req.params.deliveryId })
      .populate('sender', 'name avatar')
      .sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});
module.exports = router;
