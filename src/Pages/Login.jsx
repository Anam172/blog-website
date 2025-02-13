import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../contexts/AuthContext"; // ✅ Import AuthContext

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth(); // ✅ Use AuthContext
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Manual Login (Fixed)
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
  
    console.log("Form Data Before Sending:", formData); // Debugging
  
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      console.log("Response from Server:", data); // Debugging
  
      if (!response.ok) {
        setError(data.error || "Login failed");
        return;
      }
  
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      navigate("/");
    } catch (error) {
      console.error("Login Request Failed:", error);
      setError("Server error. Please try again.");
    }
  };
  
  

  // ✅ Handle Google Login
  const handleGoogleSuccess = async (response) => {
    console.log("Google Token:", response.credential);

    try {
      const res = await fetch("http://localhost:5000/api/auth/google-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: response.credential }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Google login failed");
        return;
      }

      // ✅ Store token & user in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ Update AuthContext
      setUser(data.user);

      navigate("/");
    } catch (error) {
      setError("Google Login Failed. Try again.");
    }
  };

  const handleGoogleFailure = () => {
    setError("Google login was unsuccessful. Try again.");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
            onChange={handleChange}
            autoComplete="email"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
            onChange={handleChange}
            autoComplete="current-password"
            required
          />
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <div className="flex items-center justify-between">
          <hr className="w-full border-gray-300" />
          <p className="text-sm text-gray-500 px-2">OR</p>
          <hr className="w-full border-gray-300" />
        </div>

        <div className="flex justify-center">
          <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleFailure} />
        </div>

        <p className="text-center text-gray-600">
          Don't have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
