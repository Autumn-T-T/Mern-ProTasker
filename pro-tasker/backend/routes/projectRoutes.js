const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

// Routes
router.route("/")
  .post(protect, createProject)
  .get(protect, getProjects);

router.route("/:id")
  .put(protect, updateProject)
  .delete(protect, deleteProject);

module.exports = router;