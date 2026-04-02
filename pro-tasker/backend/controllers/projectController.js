const Project = require("../models/Project");

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const project = await Project.create({
      name: req.body.name,
      description: req.body.description,
      owner: req.user._id,
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all projects for logged-in user
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user._id });
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a project
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ message: "Project not found" });
    if (project.owner.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    project.name = req.body.name || project.name;
    project.description = req.body.description || project.description;

    const updatedProject = await project.save();
    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ message: "Project not found" });
    if (project.owner.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    await project.deleteOne();
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};