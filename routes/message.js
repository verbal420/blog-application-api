const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message');
const { authenticateUser } = require('../auth');

router.post('/', authenticateUser, messageController.createMessage);

module.exports = router;