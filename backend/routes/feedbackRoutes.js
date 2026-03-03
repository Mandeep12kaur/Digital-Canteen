const express = require('express');
const { submitFeedback, getAllFeedback } = require('../controllers/feedbackController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Public route to submit feedback
router.post('/', submitFeedback);

// Private route for admin to see all feedback
router.get('/', protect, admin, getAllFeedback);

module.exports = router;
