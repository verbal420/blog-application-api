const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    // Access JWT_SECRET_KEY from the app's locals object
    const JWT_SECRET_KEY = req.app.locals.JWT_SECRET_KEY; 

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(403).json({ error: "Access denied!" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY); // Verify using the secret key
        req.user = decoded; // Attach the decoded token to the request object
        next(); // Proceed to the next middleware/route handler
    } catch (error) {
        res.status(403).json({ error: "Invalid token!" });
    }
};

module.exports = { authenticate };