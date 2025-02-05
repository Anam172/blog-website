import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth(); // Access user data and logout function
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown when clicking on profile image
  const handleToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-black text-white">
      <div className="container mx-auto px-4 flex flex-row justify-between items-center py-4">
        <div className="hidden text-2xl font-bold lg:inline-block">MyBlog</div>

        <ul className="flex space-x-6 text-xl font-semibold">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-orange-300 font-semibold" : "hover:text-orange-300"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "text-orange-300 font-semibold" : "hover:text-orange-300"
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blogs"
              className={({ isActive }) =>
                isActive ? "text-orange-300 font-semibold" : "hover:text-orange-300"
              }
            >
              Blogs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "text-orange-300 font-semibold" : "hover:text-orange-300"
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Conditional rendering for user profile */}
        {!user ? (
          <NavLink
            to="/login"
            className="bg-orange-400 text-black px-8 py-2 rounded hover:bg-orange-500 lg:inline-block"
          >
            Login
          </NavLink>
        ) : (
          <div className="relative" ref={dropdownRef}>
            {/* Profile Image (Click to Open Dropdown) */}
            <img
              src={user.image ? user.image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT79-tMffOqIXeX4EPdTMbuFsFhReGuavAnow&s"}
              alt="User"
              className="w-10 h-10 rounded-full object-cover cursor-pointer"
              onClick={handleToggle}
            />

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-gray-50 text-black rounded-lg shadow-lg py-2">
                <div className="px-4 py-2">
                  <p className="text-lg font-semibold">{user.name}</p>
                  <p className="text-sm py-2 text-gray-500">{user.email}</p>
                </div>
                <hr />
                <button
                  onClick={logout}
                  className="w-full text-center px-4 py-2 text-orange-400 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
