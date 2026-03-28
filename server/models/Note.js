const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  text: String,
  type: { type: String, enum: ['confusing', 'important', 'insight'] },
  startIndex: Number,
  endIndex: Number,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  thread: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: String,
    message: String,
    createdAt: { type: Date, default: Date.now }
  }],
  resolved: { type: Boolean, default: false }
});

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  content: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  ownerName: String,
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', default: null },
  tags: [tagSchema],
  summary: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);
