import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Login form submitted with:', { email, password });

    try {
      await login(email, password);
      console.log('Login successful, navigating to home');
      navigate('/');  // Redirect to home after login
    } catch (err) {
      console.error('Login error:', err);
      setError(err?.message || 'Failed to login');
    }
  };

  // Handle Google Login Response
  const handleGoogleSuccess = async (response) => {
    console.log('Google login response:', response);
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/google-login", {
        token: response.credential,
      });

      console.log('Google login response data:', data);

      if (data.token) {
        localStorage.setItem("token", data.token);
        console.log('Token saved in localStorage');
        navigate("/");  // Redirect to home after successful Google login
      } else {
        console.error('No token received from server');
        setError('Failed to retrieve token.');
      }
    } catch (error) {
      console.error('Google login failed:', error);
      setError("Google login failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center mb-6">Login</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="username"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex justify-center">
            <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-md">
              Login
            </button>
          </div>
        </form>

        <div className="flex justify-center mt-4">
          {/* Google Login button */}
          <GoogleLogin 
            onSuccess={handleGoogleSuccess} 
            onError={() => console.log("Google Login Failed")} 
          />
        </div>

        <div className="text-center mt-4">
          <p className="text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
