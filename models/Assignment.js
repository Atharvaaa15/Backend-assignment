const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  task: { type: String, required: true },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  submittedAt: { type: Date, default: Date.now },
});

const Assignment = mongoose.model('Assignment', AssignmentSchema);
module.exports = Assignment;
