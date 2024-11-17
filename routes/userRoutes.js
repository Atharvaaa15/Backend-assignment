const express = require('express');
const { registerUser, loginUser, uploadAssignment } = require('../controllers/userController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/upload', protect, uploadAssignment);

module.exports = router;
