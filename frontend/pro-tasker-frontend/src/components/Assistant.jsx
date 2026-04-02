import { useEffect, useState } from "react";
import "./Assistant.css";
import assistantGif from "../assets/babe-jig.gif";

const tips = [
  "Don't forget to update your project's progress!",
  "Click a project to view tasks!",
  "Hover over delete buttons carefully.",
  "Stay on top of your deadlines!",
];

export default function Assistant() {
  const [tip, setTip] = useState("");
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomTip = tips[Math.floor(Math.random() * tips.length)];
      setTip(randomTip);
      setShowTip(true);
      setTimeout(() => setShowTip(false), 4000); // hide after 4s
    }, 10000); // show every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="assistant-container">
      {/* Tip box floats absolutely above the GIF */}
      <div className={`assistant-tip ${showTip ? "show" : ""}`}>{tip}</div>
      <img className="assistant-gif" src={assistantGif} alt="Assistant" />
    </div>
  );
}