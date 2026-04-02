const Task = require("../models/Task");
const Project = require("../models/Project");

// Create a task under a project
exports.createTask = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });
    if (project.owner.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status || "To Do",
      project: project._id,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all tasks for a project
exports.getTasks = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });
    if (project.owner.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    const tasks = await Task.find({ project: project._id });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId).populate("project");
    if (!task) return res.status(404).json({ message: "Task not found" });
    if (task.project.owner.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;

    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId).populate("project");
    if (!task) return res.status(404).json({ message: "Task not found" });
    if (task.project.owner.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    await task.deleteOne();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};