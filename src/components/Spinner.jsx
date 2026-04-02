import React from "react";

export default function Spinner({ color = "#f59e0b" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "20px 0" }}>
      <div style={{
        width: "16px",
        height: "16px",
        border: `2px solid ${color}33`,
        borderTop: `2px solid ${color}`,
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }} />
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#7a6a4a" }}>
        generando con Gemini...
      </span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}