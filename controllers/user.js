const User = require('../models/User');
const bcrypt = require('bcrypt');
const { generateToken } = require('../auth');

module.exports.registerUser = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

        const token = generateToken(user);

        res.status(200).json({
            message: 'Login successful',
            token,
            user: { id: user._id, username: user.username, isAdmin: user.isAdmin }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};