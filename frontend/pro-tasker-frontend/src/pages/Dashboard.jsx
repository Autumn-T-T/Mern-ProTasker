import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");

  const fetchProjects = async () => {
    try {
      const res = await axios.get("/api/projects", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setProjects(res.data);
    } catch (err) {
      console.error("Fetch projects error:", err.response?.data || err.message);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "/api/projects",
        { name },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      setName("");
      fetchProjects();
    } catch (err) {
      console.error("Create project error:", err.response?.data || err.message);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      await axios.delete(`/api/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      fetchProjects();
    } catch (err) {
      console.error("Delete project error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchProjects();
    }
  }, [user]);

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user?.name}!</h1>
      <button onClick={logout}>Logout</button>

      <h2>Create Project</h2>
      <form onSubmit={handleCreateProject} className="project-form">
        <input
          type="text"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Add Project</button>
      </form>

      <h2>Your Projects</h2>
      {projects.length === 0 ? (
        <p>No projects yet</p>
      ) : (
        <ul className="project-list">
          {projects.map((project) => (
            <li key={project._id} className="project-card">
              <span
                onClick={() => navigate(`/projects/${project._id}`)}
                className="project-name"
              >
                {project.name}
              </span>
              <button
                onClick={() => handleDeleteProject(project._id)}
                className="delete-button"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}