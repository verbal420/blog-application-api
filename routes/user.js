const { JWT_SECRET_KEY } = require("../index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = require("express").Router();

// Register
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found!" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ error: "Invalid credentials!" });

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, JWT_SECRET_KEY, { expiresIn: "1h" });
        res.status(200).json({ token, user: { id: user._id, username: user.username, isAdmin: user.isAdmin } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
