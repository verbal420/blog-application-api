const Message = require('../models/Message');

module.exports.createMessage = async (req, res) => {
  try {
    const { content } = req.body;
    const message = new Message({
      content,
      sender: req.user.id,
    });
    await message.save();
    res.status(201).json({ message: 'Message sent to the universe!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message.' });
  }
};