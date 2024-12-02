const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blogs");
const commentRoutes = require("./routes/comments");

// Initialize App
const app = express();
const PORT = 5000;

// MongoDB connection string and JWT secret key
const MONGODB_STRING = "mongodb+srv://admin:admin123@wdc028-b461.yfrua.mongodb.net/blog-application?retryWrites=true&w=majority&appName=WDC028-B461"; 
const JWT_SECRET_KEY = "blogapplication"; 

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentRoutes);

// Connect to MongoDB and start server
mongoose
    .connect(MONGODB_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error) => console.log("Database connection failed:", error.message));

// Export secret key for middleware and other modules
module.exports = { JWT_SECRET_KEY };
