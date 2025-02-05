import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Blogs from './Blogs';

const Home = () => {
  const [latestBlogs, setLatestBlogs] = useState([]);

  useEffect(() => {
    // Fetch the latest blogs from the server
    fetch('http://localhost:5000/api/blogs/latest')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setLatestBlogs(data.data); 
        } else {
          console.error('Failed to fetch latest blogs');
        }
      })
      .catch((err) => console.error('Error fetching latest blogs:', err));
  }, []);

  return (
    <>
      <div className="h-auto py-8 bg-black text-white text-center lg:h-80 gap-y-16">
        <h1 className="text-6xl font-bold p-4">Welcome to Our Blog</h1>
        <p className="text-md">
          Start your blog today and join a community of writers and readers who are passionate about
          sharing their stories and ideas. <br />
          We offer everything you need to get started, from helpful tips and tutorials.
        </p>
        <button className="font-medium border p-2 my-4 border-white">Learn more</button>
      </div>

      {/* Home Page Layout with Sidebar */}
      <div className="container mx-auto px-4 py-4 flex lg:flex-row gap-4">
        {/* Blog Content (left side) */}
        <div className="flex-1">
          <Blogs />
        </div>

        {/* Latest Blog Sidebar (right side) */}
        <div className="w-96 my-12 p-4">
          <h2 className="text-3xl font-semibold p-4">Latest Blogs</h2>
          <div>
            {latestBlogs.length > 0 ? (
              latestBlogs.map((blog) => (
                <div key={blog._id} className="bg-white mb-4 overflow-hidden border-b-2 border-gray-100">
                  <div className="py-4 px-4">
                    <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                    <p className="text-gray-600 mb-4">{blog.summary}</p>
                    <Link to={`/blog/${blog._id}`} className="text-blue-400 hover:underline">
                      Read More
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p>No latest blogs available.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
