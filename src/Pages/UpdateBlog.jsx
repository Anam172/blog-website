import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateBlog = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const navigate = useNavigate();
  const [blog, setBlog] = useState({
    title: "",
    summary: "",
    content: "",
    category: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the blog details
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        setBlog(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch blog details");
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Filter out empty fields
    const updatedBlog = Object.fromEntries(
      Object.entries(blog).filter(([_, value]) => value.trim() !== "")
    );
  
    try {
      await axios.put(`http://localhost:5000/api/blogs/${id}`, updatedBlog);
      alert("Blog updated successfully!");
      navigate("/blogs");
    } catch (err) {
      setError("Failed to update blog");
    }
  };
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value,
    }));
  };

  if (loading) return <p className="text-gray-500">Loading blog...</p>;
  if (error) return <p className="text-green-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Update Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-medium">Title:</label>
          <input
            type="text"
            name="title"
            value={blog.title}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>

        {/* Summary */}
        <div>
          <label className="block font-medium">Summary:</label>
          <textarea
            name="summary"
            value={blog.summary}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            rows="3"
            required
          ></textarea>
        </div>

        {/* Content */}
        <div>
          <label className="block font-medium">Content:</label>
          <textarea
            name="content"
            value={blog.content}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            rows="5"
            required
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium">Category:</label>
          <input
            type="text"
            name="category"
            value={blog.category}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block font-medium">Image URL:</label>
          <input
            type="text"
            name="image"
            value={blog.image}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-500"
          >
            Update Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBlog;
