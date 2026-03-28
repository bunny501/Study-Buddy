const express = require('express');
const router = express.Router();
const Group = require('../models/Group');
const auth = require('../middleware/auth');
const crypto = require('crypto');

// Get my groups
router.get('/', auth, async (req, res) => {
  try {
    const groups = await Group.find({ members: req.user.id }).populate('members', 'username');
    res.json(groups);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// Get single group
router.get('/:id', auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id).populate('members', 'username');
    res.json(group);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// Create group
router.post('/', auth, async (req, res) => {
  try {
    const { name, subject } = req.body;
    const inviteCode = crypto.randomBytes(4).toString('hex').toUpperCase();
    const group = await Group.create({ name, subject, creator: req.user.id, members: [req.user.id], inviteCode });
    res.json(group);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// Join via invite code
router.post('/join', auth, async (req, res) => {
  try {
    const { inviteCode } = req.body;
    const group = await Group.findOne({ inviteCode });
    if (!group) return res.status(404).json({ message: 'Invalid code' });
    if (!group.members.includes(req.user.id)) {
      group.members.push(req.user.id);
      await group.save();
    }
    res.json(group);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// Add task
router.post('/:id/task', auth, async (req, res) => {
  try {
    const { title, assignedTo } = req.body;
    const group = await Group.findById(req.params.id);
    group.tasks.push({ title, assignedTo });
    await group.save();
    res.json(group);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// Update task status
router.put('/:id/task/:taskId', auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    const task = group.tasks.id(req.params.taskId);
    task.status = req.body.status;
    await group.save();
    res.json(group);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

module.exports = router;
