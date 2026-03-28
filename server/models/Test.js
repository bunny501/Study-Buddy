const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String,
  type: { type: String, enum: ['mcq', 'text'], default: 'mcq' }
});

const testSchema = new mongoose.Schema({
  title: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  creatorName: String,
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  questions: [questionSchema],
  results: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: String,
    score: Number,
    answers: [String]
  }],
  status: { type: String, enum: ['waiting', 'active', 'completed'], default: 'waiting' },
  duration: { type: Number, default: 600 },
}, { timestamps: true });

module.exports = mongoose.model('Test', testSchema);
