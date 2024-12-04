const express = require("express");
const Blog = require("../models/Blog");
const { authenticate } = require("../middlewares/authMiddleware");

const router = express.Router();

// Create a blog
router.post("/", authenticate, async (req, res) => {
  const { title, content } = req.body;
  try {
    const blog = new Blog({ title, content, author: req.user.id });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "username");
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user-specific blogs
router.get("/mine", authenticate, async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user.id });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a blog
router.put("/:id", authenticate, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found!" });

    if (blog.author.toString() !== req.user.id)
      return res.status(403).json({ error: "Unauthorized!" });

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a blog
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found!" });

    if (blog.author.toString() !== req.user.id)
      return res.status(403).json({ error: "Unauthorized!" });

    await blog.remove();
    res.status(200).json({ message: "Blog deleted!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
