import mongoose from "mongoose";
import Blog from "../models/Blog.js";
import User from "../models/User.js";

// Get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("authorID", "image name");
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};

// Create a new blog
export const createBlog = async (req, res) => {
  try {
    const { title, summary, content, category, image, authorID } = req.body;

    if (!title || !content || !authorID) {
      return res.status(400).json({ error: "Title, content, and authorID are required." });
    }

    const authorExists = await User.findById(authorID);
    if (!authorExists) {
      return res.status(404).json({ error: "Author not found" });
    }

    const newBlog = new Blog({
      title,
      summary,
      content,
      category,
      image,
      date: new Date(),
      authorID,
    });

    await newBlog.save();
    res.status(201).json({ message: "Blog created successfully", blog: newBlog });

  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Get a blog by ID
export const getBlogById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid blog ID" });
  }

  try {
    const blog = await Blog.findById(req.params.id).populate("authorID", "image name");
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.status(200).json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ error: "Failed to fetch blog" });
  }
};

// Update a blog
export const updateBlog = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid blog ID" });
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBlog) return res.status(404).json({ error: "Blog not found" });
    res.status(200).json({ message: "Blog updated successfully", updatedBlog });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(400).json({ error: "Failed to update blog" });
  }
};

// Delete a blog
export const deleteBlog = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid blog ID" });
  }

  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) return res.status(404).json({ error: "Blog not found" });
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ error: "Failed to delete blog" });
  }
};

// Get latest blogs 
export const getLatestBlogs = async (req, res) => {
  try {
    const latestBlogs = await Blog.find().sort({ createdAt: -1 }).limit(5).populate("authorID", "image name");
    res.status(200).json({ success: true, data: latestBlogs });
  } catch (error) {
    console.error("Error fetching latest blogs:", error);
    res.status(500).json({ success: false, message: "Error fetching latest blogs", error: error.message });
  }
};
