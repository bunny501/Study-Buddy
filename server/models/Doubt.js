const mongoose = require('mongoose');

const doubtSchema = new mongoose.Schema({
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  postedByUsername: String,
  topic: String,
  description: String,
  subject: String,
  branch: String,
  replies: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: String,
    text: String,
    createdAt: { type: Date, default: Date.now }
  }],
  resolved: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Doubt', doubtSchema);
