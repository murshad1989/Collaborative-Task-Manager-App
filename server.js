const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task"); // Task Routes Import
const dotenv = require("dotenv");
const authMiddleware = require("./middlewares/auth"); // JWT Middleware

// Load environment variables
dotenv.config();

// Create an Express app
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/tasks", taskRoutes); // Task management routes

// Connect to MongoDB database
mongoose
  .connect(process.env.MONGO_URI,)
  .then(() => {
    console.log("Database connection done:");
  })
  .catch(err => {
    console.log("Database connection error:", err);
  });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
