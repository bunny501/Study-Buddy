const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get all users (for partner match)
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user.id } }).select('-password');
    res.json(users);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// Get profile
router.get('/profile/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password').populate('friends', 'username');
    res.json(user);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// Update profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { college, branch, subjects, availability } = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, { college, branch, subjects, availability }, { new: true }).select('-password');
    res.json(user);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// Send friend request
router.post('/request/:id', auth, async (req, res) => {
  try {
    const target = await User.findById(req.params.id);
    if (!target) return res.status(404).json({ message: 'User not found' });
    if (!target.friendRequests.includes(req.user.id)) {
      target.friendRequests.push(req.user.id);
      await target.save();
    }
    res.json({ message: 'Request sent' });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// Accept friend request
router.post('/accept/:id', auth, async (req, res) => {
  try {
    const me = await User.findById(req.user.id);
    const them = await User.findById(req.params.id);
    me.friendRequests = me.friendRequests.filter(r => r.toString() !== req.params.id);
    if (!me.friends.includes(req.params.id)) me.friends.push(req.params.id);
    if (!them.friends.includes(req.user.id)) them.friends.push(req.user.id);
    await me.save(); await them.save();
    res.json({ message: 'Friends now' });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

module.exports = router;
