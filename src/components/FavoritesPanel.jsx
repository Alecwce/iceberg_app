import React, { useState } from "react";

export default function FavoritesPanel({ favorites, onRemove, onRestore }) {
  const [visible, setVisible] = useState(false);

  if (!visible) {
    return (
      <button
        onClick={() => setVisible(true)}
        style={{
          position: "fixed", bottom: "20px", right: "170px",
          background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)",
          color: "#34d399", padding: "10px 16px", borderRadius: "8px",
          fontFamily: "'DM Mono', monospace", fontSize: "11px", cursor: "pointer",
        }}
      >
        ⭐ Favoritos ({favorites.length})
      </button>
    );
  }

  return (
    <div style={{
      position: "fixed", bottom: "20px", right: "170px",
      background: "rgba(18,16,10,0.95)", border: "1px solid rgba(52,211,153,0.2)",
      borderRadius: "12px", padding: "16px", width: "320px", maxHeight: "400px",
      overflow: "auto",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#34d399" }}>
          ⭐ FAVORITOS
        </span>
        <button
          onClick={() => setVisible(false)}
          style={{ background: "none", border: "none", color: "#5a4a2a", cursor: "pointer" }}
        >✕</button>
      </div>

      {favorites.length === 0 ? (
        <p style={{ color: "#6a5a38", fontSize: "12px", textAlign: "center" }}>
          Sin favoritos aún
        </p>
      ) : (
        favorites.map(entry => (
          <div
            key={entry.id}
            style={{
              padding: "10px", marginBottom: "8px",
              background: "rgba(0,0,0,0.3)", borderRadius: "6px",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}
          >
            <div
              style={{ cursor: "pointer", flex: 1 }}
              onClick={() => onRestore?.(entry)}
            >
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "#f0d898" }}>
                {entry.topic}
              </div>
              <div style={{ fontSize: "10px", color: "#6a5a38", marginTop: "4px" }}>
                {new Date(entry.addedAt).toLocaleDateString()}
              </div>
            </div>
            <button
              onClick={() => onRemove(entry.id)}
              style={{
                background: "none", border: "none", color: "#f87171",
                cursor: "pointer", fontSize: "14px", padding: "4px",
              }}
            >✕</button>
          </div>
        ))
      )}
    </div>
  );
}