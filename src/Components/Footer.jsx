import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm">&copy; 2025 MyBlog. All rights reserved.</p>
        <div className="mt-4">
          <Link to="#" className="text-white px-4 hover:text-gray-400 ">Privacy Policy</Link>
          <Link to="#" className="text-white px-4 hover:text-gray-400 ">Terms of Service</Link>
          <Link to="/contact" className="text-white px-4 hover:text-gray-400 ">Contact</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer