const Feedback = require('../models/Feedback');

const submitFeedback = async (req, res) => {
    try {
        const { email, idea } = req.body;

        if (!email || !idea) {
            return res.status(400).json({ message: 'Please provide both email and idea.' });
        }

        const feedback = await Feedback.create({
            email,
            idea
        });

        res.status(201).json({
            message: 'Feedback submitted successfully',
            data: feedback
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error while submitting feedback',
            error: error.message
        });
    }
};

const getAllFeedback = async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({ createdAt: -1 });
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({
            message: 'Server error while fetching feedback',
            error: error.message
        });
    }
};

module.exports = {
    submitFeedback,
    getAllFeedback
};
