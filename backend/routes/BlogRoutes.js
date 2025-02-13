import express from "express";
import { 
  getAllBlogs, 
  createBlog, 
  getBlogById, 
  updateBlog, 
  deleteBlog, 
  getLatestBlogs 
} from "../controllers/blogController.js"; 
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Latest blogs route
router.get("/latest", getLatestBlogs);

router.get("/", getAllBlogs);
router.post("/", protect, createBlog); // Only logged-in users can create blogs
router.get("/:id", getBlogById);
router.put("/:id", protect, updateBlog); // ✅ Only logged-in users can update blogs
router.delete("/:id", deleteBlog);

export default router; 
