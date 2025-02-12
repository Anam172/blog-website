import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = process.env.JWT_EXPIRY || "7d"; 
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET in .env file"); // ✅ Prevents misconfigurations
}

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// ✅ User Registration
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("Signup Request Body:", req.body); // Debugging

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword, // Store hashed password
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ User Login
export const login = async (req, res) => {
  try {
    console.log("🔹 Received Login Request:", req.body);

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    console.log("🔹 Checking User in Database...");
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log("🔹 Validating Password...");
    // ✅ FIX: Use bcrypt.compare directly
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    console.log("🔹 Generating JWT...");
    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET is missing in .env file!");
      return res.status(500).json({ error: "Server configuration error" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token, user });
  } catch (error) {
    console.error("❌ Login Error:", error.message);
    res.status(500).json({ error: "Server error. Please try again." });
  }
};

// ✅ Google Authentication
export const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: "No token provided" });

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) return res.status(400).json({ error: "Invalid Google token" });

    // ✅ FIX: Don't reassign `const` variable
    const { name, email, picture, sub: googleId } = payload;
    const lowerEmail = email.toLowerCase(); // ✅ Fix applied

    let user = await User.findOne({ $or: [{ email: lowerEmail }, { googleId }] });

    if (!user) {
      user = new User({ name, email: lowerEmail, googleId, profilePic: picture });
      await user.save();
    } else if (!user.googleId) {
      user.googleId = googleId; // ✅ Ensures existing users get linked with Google
      await user.save();
    }

    const jwtToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRY });

    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ 
      message: "Google Auth successful", 
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
      },
      token // ✅ Include token in response so frontend can store it
    });
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};
