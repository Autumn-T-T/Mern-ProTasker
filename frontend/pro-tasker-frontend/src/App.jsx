import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProjectDetails from "./pages/ProjectDetails";

export default function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      {/* Floating Hearts */}
      <div className="heart-container">
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            className="heart"
            style={{
              left: `${Math.random() * 100}vw`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${Math.random() * 1.5 + 1}rem`,
            }}
          >
            ❤️
          </span>
        ))}
      </div>

      {/* Routes */}
      <Routes>
        <Route
          path="/"
          element={<Navigate to={user ? "/dashboard" : "/login"} />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/dashboard" /> : <Register />}
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/projects/:projectId"
          element={user ? <ProjectDetails /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}