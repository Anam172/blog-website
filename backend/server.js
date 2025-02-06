const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/BlogRoutes");
const teamRoutes = require("./routes/teamRoutes");
const contactRoutes = require("./routes/contactRoutes");

// Initialize the app
const app = express();


// Middleware
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST'],
  credentials: true,
}));

app.use(bodyParser.json());
app.use(express.json());

app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// API Routes
app.use('/api/auth', authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/teams", teamRoutes); 
app.use("/api/contact", contactRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { dbName: "blogDB",})
  .then(() => console.log("MongoDB connected"))
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });

// Root route
app.get("/", (req, res) => {
  res.send(" Welcome to the Blog API!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
