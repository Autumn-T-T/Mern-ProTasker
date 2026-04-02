const express = require("express");
const router = express.Router({ mergeParams: true });
const { protect } = require("../middleware/authMiddleware");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

// /api/projects/:projectId/tasks
router.route("/")
  .post(protect, createTask)
  .get(protect, getTasks);

router.route("/:taskId")
  .put(protect, updateTask)
  .delete(protect, deleteTask);

module.exports = router;