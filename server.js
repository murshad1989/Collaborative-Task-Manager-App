const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const authMiddleware = require("./middlewares/authMiddleware");
const db = require("./config/db");

// Environment Variables
dotenv.config();

// Initialize Express App
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes); // User Authentication
app.use("/api/tasks", authMiddleware, taskRoutes); // Task Management
app.use("/api/analytics", authMiddleware, analyticsRoutes); // Analytics

// Handle 404 Errors
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Global Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// Test Database Connection
db.getConnection()
  .then((conn) => {
    console.log("Database connected successfully!");
    conn.release();
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
  });

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
