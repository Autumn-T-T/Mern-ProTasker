// frontend/src/context/AuthContext.jsx
import { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("protaskerUser");
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      setUser(res.data);
      localStorage.setItem("protaskerUser", JSON.stringify(res.data));
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      setUser(res.data);
      localStorage.setItem("protaskerUser", JSON.stringify(res.data));
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("protaskerUser");
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};