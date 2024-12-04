const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const JWT_SECRET_KEY = req.app.locals.JWT_SECRET_KEY;
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ error: "Access denied!" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid token!" });
  }
};

module.exports = { authenticate };
