const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Assignment = require('../models/Assignment');

// Register new user
const registerUser = async (req, res) => {
  const { username, password } = req.body;
  const userExist = await User.findOne({ username });

  if (userExist) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = new User({ username, password });
  await user.save();
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

  res.status(201).json({ message: 'User registered', token });
};

// Login user
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ message: 'Login successful', token });
};

// Upload assignment
const uploadAssignment = async (req, res) => {
  const { task, adminId } = req.body;
  const userId = req.user._id;

  const assignment = new Assignment({ userId, task, admin: adminId });
  await assignment.save();
  res.status(201).json({ message: 'Assignment uploaded', assignment });
};

module.exports = { registerUser, loginUser, uploadAssignment };
