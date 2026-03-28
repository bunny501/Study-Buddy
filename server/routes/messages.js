const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const auth = require('../middleware/auth');

// Get DM history
router.get('/dm/:userId', auth, async (req, res) => {
  try {
    const msgs = await Message.find({
      type: 'dm',
      $or: [
        { from: req.user.id, to: req.params.userId },
        { from: req.params.userId, to: req.user.id }
      ]
    }).sort('createdAt');
    res.json(msgs);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// Get group messages
router.get('/group/:groupId', auth, async (req, res) => {
  try {
    const msgs = await Message.find({ type: 'group', groupId: req.params.groupId }).sort('createdAt');
    res.json(msgs);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

module.exports = router;
