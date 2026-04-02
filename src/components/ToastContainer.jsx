import React from "react";

export default function ToastContainer({ toasts }) {
  if (toasts.length === 0) return null;

  const getStyles = (type) => {
    const base = {
      padding: "12px 16px",
      borderRadius: "8px",
      fontFamily: "'DM Mono', monospace",
      fontSize: "12px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      animation: "fadeIn 0.2s ease",
      cursor: "pointer",
    };

    switch (type) {
      case "success":
        return {
          ...base,
          background: "rgba(52,211,153,0.15)",
          border: "1px solid rgba(52,211,153,0.3)",
          color: "#34d399",
        };
      case "error":
        return {
          ...base,
          background: "rgba(248,113,113,0.15)",
          border: "1px solid rgba(248,113,113,0.3)",
          color: "#f87171",
        };
      default:
        return {
          ...base,
          background: "rgba(180,130,40,0.15)",
          border: "1px solid rgba(180,130,40,0.3)",
          color: "#f59e0b",
        };
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "success": return "✓";
      case "error": return "✕";
      default: return "ℹ";
    }
  };

  return (
    <div style={{ position: "fixed", top: "20px", right: "20px", zIndex: 9999 }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      {toasts.map(t => (
        <div key={t.id} style={getStyles(t.type)}>
          <span>{getIcon(t.type)}</span>
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}