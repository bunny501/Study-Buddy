const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, default: '' },
  college: { type: String, default: '' },
  branch: { type: String, default: '' },
  subjects: [String],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  availability: { type: String, default: 'anytime' },
  stars: { type: Number, default: 0 },
  level: { type: String, default: 'Beginner' },
  notesUploaded: { type: Number, default: 0 },
  testsTaken: { type: Number, default: 0 },
  tasksCompleted: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
