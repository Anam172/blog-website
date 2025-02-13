import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String },
  content: { type: String, required: true },
  category: { type: String },
  image: { type: String },
  date: { type: Date, default: Date.now },
  authorID: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true 
  }, 
});

const Blog = mongoose.model("Blog", BlogSchema);
export default Blog;
