const express = require('express');
const { loginAdmin, viewAssignments, acceptAssignment, rejectAssignment } = require('../controllers/adminController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', loginAdmin);
router.get('/assignments', protect, viewAssignments);
router.post('/assignments/:id/accept', protect, acceptAssignment);
router.post('/assignments/:id/reject', protect, rejectAssignment);

module.exports = router;
