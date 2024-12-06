const express = require('express');
const postController = require('../controllers/post');
const { authenticateUser, isAdmin } = require('../auth');

const router = express.Router();

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post('/', authenticateUser, postController.createPost);
router.put('/:id', authenticateUser, postController.updatePost);
router.delete('/:id', authenticateUser, isAdmin, postController.deletePost);

module.exports = router;