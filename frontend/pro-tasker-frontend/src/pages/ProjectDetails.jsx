// frontend/src/pages/ProjectDetails.jsx
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProjectDetails() {
  const { projectId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/projects/${projectId}/tasks`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:5000/api/projects/${projectId}/tasks`,
        { title, description },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (taskId, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/projects/${projectId}/tasks/${taskId}`,
        { status },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/projects/${projectId}/tasks/${taskId}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <button onClick={() => navigate("/dashboard")} style={{ marginBottom: "1rem" }}>
        ← Back to Dashboard
      </button>

      <h2>Project Tasks</h2>

      <form onSubmit={handleCreateTask} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      {tasks.length === 0 ? (
        <p>No tasks yet</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((task) => (
            <li key={task._id} className="task-card">
              <strong>{task.title}</strong> - {task.description}
              <br />
              Status: {task.status}
              <br />
              <button onClick={() => updateStatus(task._id, "To Do")}>To Do</button>
              <button onClick={() => updateStatus(task._id, "In Progress")}>In Progress</button>
              <button onClick={() => updateStatus(task._id, "Done")}>Done</button>
              <button onClick={() => deleteTask(task._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}