const mongoose = require('mongoose');

const battleSchema = new mongoose.Schema({
  topic: String,
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
  questions: [{
    question: String,
    options: [String],
    answer: String
  }],
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
  groupNames: [String],
  results: [{
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
    groupName: String,
    score: Number,
    stars: Number
  }],
  status: { type: String, enum: ['waiting', 'active', 'completed'], default: 'waiting' },
  duration: { type: Number, default: 300 },
  discussion: [{
    user: String,
    text: String,
    questionIndex: { type: Number, default: -1 },
    type: { type: String, enum: ['general', 'question', 'insight'], default: 'general' },
    upvotes: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Battle', battleSchema);
