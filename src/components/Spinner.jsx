import React from "react";

export default function Spinner({ color = "#000080" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 0" }}>
      {/* Classic Win2K hourglass animation */}
      <div style={{
        width: "16px",
        height: "16px",
        border: "2px solid #808080",
        borderTopColor: "#000080",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }} />
      <div style={{
        background: "#d4d0c8",
        border: "2px solid",
        borderColor: "#ffffff #808080 #808080 #ffffff",
        padding: "2px 10px",
        fontFamily: "Tahoma, 'MS Sans Serif', Arial, sans-serif",
        fontSize: "11px",
        color: "#000",
      }}>
        Generando con Gemini...
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
