const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path"); // ✅ ADD THIS

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });

// API routes
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/projects/:projectId/tasks", taskRoutes);

// ✅ SERVE FRONTEND (THIS IS WHAT YOU WERE MISSING)
app.use(express.static(path.join(__dirname, "public")));

// ✅ React Router fallback (VERY IMPORTANT)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
