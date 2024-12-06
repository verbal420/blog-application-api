const Comment = require('../models/Comment');

module.exports.getCommentsByPost = async (req, res) => {
    try {
        const comments = await Comment.find({ post: req.params.postId }).populate('author', 'username');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.addComment = async (req, res) => {
    const { content } = req.body;
    try {
        const newComment = new Comment({ 
            content, 
            post: req.params.postId, 
            author: req.user.id 
        });

        await newComment.save();

        const populatedComment = await Comment.findById(newComment._id).populate('author', 'username');

        res.status(201).json(populatedComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.deleteComment = async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.commentId);
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};