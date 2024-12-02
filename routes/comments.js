const express = require("express");
const Comment = require("../models/Comment");
const { authenticate } = require("../middlewares/authMiddleware");

const router = express.Router();

// Add a comment
router.post("/", authenticate, async (req, res) => {
    const { blog, text } = req.body;
    try {
        const comment = new Comment({ blog, text, user: req.user.id });
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get comments for a blog
router.get("/:blogId", async (req, res) => {
    try {
        const comments = await Comment.find({ blog: req.params.blogId }).populate("user", "username");
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
