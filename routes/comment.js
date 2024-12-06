const express = require('express');
const commentController = require('../controllers/comment');
const { authenticateUser, isAdmin } = require('../auth');

const router = express.Router();

router.get('/post/:postId', commentController.getCommentsByPost);
router.post('/post/:postId', authenticateUser, commentController.addComment);
router.delete('/:commentId', authenticateUser, isAdmin, commentController.deleteComment);

module.exports = router;