import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"; 
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/BlogRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

// Initialize Express App
const app = express();

// ✅ Middleware
app.use(cors({ 
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser()); 

// ✅ API Routes
console.log("Auth Routes Loaded");
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/contact", contactRoutes);

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { dbName: "blogDB" })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // Exit process if DB connection fails
  });

// ✅ Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the Blog API!");
});

// ✅ Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
