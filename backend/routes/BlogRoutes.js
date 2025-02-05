const express = require("express");
const {
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
  getLatestBlogs,
} = require("../controllers/blogController");

const router = express.Router();

//latest blogs route 
router.get("/latest", getLatestBlogs); 

router.get("/", getAllBlogs); 
router.post("/", createBlog); 
router.get("/:id", getBlogById); 
router.put("/:id", updateBlog); 
router.delete("/:id", deleteBlog); 

module.exports = router;
