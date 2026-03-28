const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fromUsername: String,
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  toUsername: String,
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', default: null },
  text: String,
  type: { type: String, enum: ['dm', 'group'], default: 'dm' },
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
