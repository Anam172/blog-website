import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

const AddBlog = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [blogData, setBlogData] = useState({
    title: "",
    summary: "",
    content: "",
    category: "",
    image: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!user || !user._id) {
      setError("You must be logged in to create a blog.");
      setLoading(false);
      return;
    }

    const newBlog = { ...blogData, authorID: user._id };

    try {
      const response = await axios.post("http://localhost:5000/api/blogs", newBlog);
      if (response.status === 201) {
        alert("Blog created successfully!");
        navigate("/blogs");
      }
    } catch (error) {
      setError(error.response?.data?.error || "Failed to create blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto my-12 p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold mb-6 text-center">Create New Blog</h1>

      {error && <div className="mb-4 text-green-500 text-center font-semibold">{error}</div>}

      {!user && (
        <div className="text-center text-blue-500 mt-4">
          <p>You must be logged in to create a blog. <a href="/login" className="underline">Login here</a>.</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {["title", "summary", "content", "category", "image"].map((field) => (
          <div className="mb-4" key={field}>
            <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={blogData[field]}
              onChange={handleChange}
              placeholder={`Enter ${field}`}
              className="w-full px-4 py-4 mt-2 border border-gray-300 rounded-md"
            />
          </div>
        ))}

        <div className="flex justify-end">
          <button
            type="submit"
            className={`w-full md:w-auto px-6 py-2 mt-4 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-black"} text-white font-semibold rounded-md hover:bg-gray-500`}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
