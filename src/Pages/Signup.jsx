import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from '@react-oauth/google';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/signup", { name, email, password });
      alert("Signup successful! Please log in.");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.error || "Something went wrong");
    }
  };

  // Handle Google Signup Response
  const handleGoogleSuccess = async (response) => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/google-login", {
        token: response.credential,
      });

      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/");  // Redirect to home after successful Google login
      }
    } catch (error) {
      console.error("Google Signup failed", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Create an Account</h2>
        <form onSubmit={handleSignup} className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
            Signup
          </button>
        </form>

        <div className="flex justify-center mt-4">
          {/* Google Login button */}
          <GoogleLogin 
            onSuccess={handleGoogleSuccess} 
            onError={() => console.log("Google Signup Failed")} 
          />
        </div>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 cursor-pointer hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
