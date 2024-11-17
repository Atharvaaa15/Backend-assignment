const User = require('../models/User');
const Assignment = require('../models/Assignment');

// Admin login
const loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  const admin = await User.findOne({ username, role: 'admin' });

  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ message: 'Login successful', token });
};

// View assignments for admin
const viewAssignments = async (req, res) => {
  const assignments = await Assignment.find({ admin: req.user._id });
  res.json(assignments);
};

// Accept assignment
const acceptAssignment = async (req, res) => {
  const assignment = await Assignment.findByIdAndUpdate(req.params.id, { status: 'accepted' }, { new: true });
  res.json({ message: 'Assignment accepted', assignment });
};

// Reject assignment
const rejectAssignment = async (req, res) => {
  const assignment = await Assignment.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
  res.json({ message: 'Assignment rejected', assignment });
};

module.exports = { loginAdmin, viewAssignments, acceptAssignment, rejectAssignment };
