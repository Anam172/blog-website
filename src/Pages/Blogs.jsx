import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blogs from the backend
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('http://localhost:5000/api/blogs'); 
      setBlogs(response.data);
    } catch (err) {
      setError('Failed to fetch blogs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Extract unique categories from blogs
  const categories = [...new Set(blogs.map((blog) => blog.category))];

  // Filter blogs based on selected category
  const filteredBlogs = blogs.filter(
    (blog) => selectedCategory === '' || blog.category === selectedCategory
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Categories */}
      <div className="border-b border-gray-200 p-4 mb-8 flex space-x-4 overflow-x-auto">
        <button
          className={`px-4 py-2 ${
            selectedCategory === ''
              ? 'font-semibold text-xl text-orange-400'
              : 'font-semibold text-xl text-black'
          }`}
          onClick={() => setSelectedCategory('')}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 ${
              selectedCategory === category
                ? 'font-semibold text-xl text-orange-400'
                : 'font-semibold text-xl text-black'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="container mx-auto px-4 py-8">
      {/* New Blog link*/}
      <div className="mb-8 flex justify-end">
        <Link
          to="/addblog"
          className="bg-black text-white px-4 py-2 rounded-lg shadow hover:bg-gray-500"
        >
          Add New Blog
        </Link>
      </div>

      {/* Blog List */}
      <div className="grid md:grid-cols-3 gap-8">
        {loading ? (
          <p className="text-gray-500">Loading blogs...</p>
        ) : error ? (
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={fetchBlogs}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Retry
            </button>
          </div>
        ) : filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <div
              key={blog._id} // Use `_id` if MongoDB is used
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-60 object-cover"
              />
              <div className="py-8 px-4">
                <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                <p className="text-gray-600 mb-2">{blog.summary}</p>
                <p className="text-sm text-gray-400">
                  {new Date(blog.date).toLocaleDateString()} | {blog.category}
                </p>
                <Link
                  to={`/blog/${blog._id}`}
                  className="text-blue-500 hover:underline font-medium mt-4 inline-flex items-center"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No blogs found.</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default Blogs;
