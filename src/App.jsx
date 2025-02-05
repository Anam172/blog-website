// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './Pages/Home';
import About from './Pages/About';
import Blogs from './Pages/Blogs';
import BlogDetail from './Pages/BlogDetail'; 
import AddBlog from './Pages/AddBlog';
import UpdateBlog from './Pages/UpdateBlog';
import Contact from './Pages/Contact';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import PrivateRoute from './Components/privateRoute';

const App = () => {
  return (
    <Router> {/* Router should wrap the entire application */}
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Private Routes - Wrap protected routes inside PrivateRoute */}
          <Route element={<PrivateRoute />}>
            <Route path="/addblog" element={<AddBlog />} />
            <Route path="/blogs/:id/update" element={<UpdateBlog />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
