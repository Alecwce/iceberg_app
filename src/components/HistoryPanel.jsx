import React, { useState } from "react";

export default function HistoryPanel({ history, onClear, onRestore }) {
  const [visible, setVisible] = useState(false);

  if (!visible) {
    return (
      <button
        onClick={() => setVisible(true)}
        style={{
          position: "fixed", bottom: "20px", right: "20px",
          background: "rgba(180,130,40,0.1)", border: "1px solid rgba(180,150,80,0.2)",
          color: "#7a6a4a", padding: "10px 16px", borderRadius: "8px",
          fontFamily: "'DM Mono', monospace", fontSize: "11px", cursor: "pointer",
        }}
      >
        📜 Historial ({history.length})
      </button>
    );
  }

  return (
    <div style={{
      position: "fixed", bottom: "20px", right: "20px",
      background: "rgba(18,16,10,0.95)", border: "1px solid rgba(180,150,80,0.2)",
      borderRadius: "12px", padding: "16px", width: "320px", maxHeight: "400px",
      overflow: "auto",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#c4a84a" }}>
          📜 HISTORIAL
        </span>
        <button
          onClick={() => setVisible(false)}
          style={{ background: "none", border: "none", color: "#5a4a2a", cursor: "pointer" }}
        >✕</button>
      </div>

      {history.length === 0 ? (
        <p style={{ color: "#6a5a38", fontSize: "12px", textAlign: "center" }}>
          Sin historial aún
        </p>
      ) : (
        <>
          {history.map(entry => (
            <div
              key={entry.id}
              style={{
                padding: "10px", marginBottom: "8px",
                background: "rgba(0,0,0,0.3)", borderRadius: "6px",
                cursor: "pointer",
              }}
              onClick={() => onRestore?.(entry)}
            >
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "#f0d898" }}>
                {entry.topic}
              </div>
              <div style={{ fontSize: "10px", color: "#6a5a38", marginTop: "4px" }}>
                {entry.actionId} · {new Date(entry.timestamp).toLocaleDateString()}
              </div>
            </div>
          ))}
          <button
            onClick={onClear}
            style={{
              width: "100%", marginTop: "8px", padding: "8px",
              background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)",
              color: "#f87171", borderRadius: "6px", fontSize: "10px", cursor: "pointer",
            }}
          >
            🗑 Limpiar historial
          </button>
        </>
      )}
    </div>
  );
}