import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BlogDetail = () => {
  const { id } = useParams(); // Retrieve the blog ID from the URL
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the blog details from the backend
  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/blogs/${id}`); 
        setBlog(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch blog details');
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [id]);

  // Handle delete blog
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this blog?'
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/blogs/${id}`); // Backend delete API
        alert('Blog deleted successfully');
        navigate('/blogs'); // Redirect to the blogs list after deletion
      } catch (err) {
        alert('Failed to delete the blog');
      }
    }
  };

  if (loading) return <p className="text-gray-500">Loading blog...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!blog) return <p className="text-gray-500">Blog not found.</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-[600px] object-cover"
        />
        <div className="py-8 px-4">
          <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
          <p className="text-gray-600">{blog.summary}</p>
          <p className="text-sm text-gray-400 mt-2">
            {new Date(blog.date).toLocaleDateString()} | {blog.category}
          </p>

          {/* Display author details */}
          {blog.authorID && (
            <div className="mt-4 flex items-center">
              <img
                src={blog.authorID.image ? blog.authorID.image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT79-tMffOqIXeX4EPdTMbuFsFhReGuavAnow&s"}
                alt={blog.authorID.name}
                className="w-12 h-12 rounded-full object-cover "
              />
              <div>
                <p className="text-lg px-2 font-semibold">{blog.authorID.name}</p>
              </div>
            </div>
          )}

          <div className="mt-4">
            <h3 className="text-xl font-bold">Content:</h3>
            <p className="text-gray-600 mt-2">{blog.content}</p>
          </div>

          <div className="flex space-x-4 mt-8">
            <Link
              to={`/blogs/${blog._id}/update`} 
              className="bg-black text-white font-medium rounded-lg px-4 py-2 inline-flex items-center hover:bg-gray-500"
            >
              Update Blog
            </Link>

            <button
              onClick={handleDelete}
              className="bg-black text-white font-medium rounded-lg px-4 py-2 inline-flex items-center hover:bg-gray-500"
            >
              Delete Blog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
