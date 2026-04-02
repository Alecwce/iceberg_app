import React, { useState } from "react";

const W = {
  face:    "#d4d0c8",
  shadow:  "#808080",
  dkShadow:"#404040",
  hilight: "#ffffff",
  btnText: "#000000",
  selBlue: "#0a246a",
  selText: "#ffffff",
};

const winBtn = {
  background: W.face,
  border: "2px solid",
  borderColor: `${W.hilight} ${W.dkShadow} ${W.dkShadow} ${W.hilight}`,
  fontFamily: "Tahoma, 'MS Sans Serif', Arial, sans-serif",
  fontSize: "11px",
  color: W.btnText,
  padding: "3px 12px",
  cursor: "pointer",
  minHeight: "23px",
};

export default function HistoryPanel({ history, onClear, onRestore }) {
  const [visible, setVisible] = useState(false);

  if (!visible) {
    return (
      <button
        onClick={() => setVisible(true)}
        style={{
          ...winBtn,
          position: "fixed",
          bottom: "16px",
          right: "16px",
          padding: "4px 12px",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        📜 Historial ({history.length})
      </button>
    );
  }

  return (
    <div style={{
      position: "fixed",
      bottom: "16px",
      right: "16px",
      background: W.face,
      border: "2px solid",
      borderColor: `${W.hilight} ${W.dkShadow} ${W.dkShadow} ${W.hilight}`,
      width: "300px",
      boxShadow: "4px 4px 8px rgba(0,0,0,0.5)",
      zIndex: 1000,
    }}>
      {/* Title bar */}
      <div style={{
        background: `linear-gradient(180deg, #0a246a 0%, #3a6ea5 100%)`,
        color: "#fff",
        padding: "3px 6px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: "11px",
        fontFamily: "Tahoma, Arial, sans-serif",
        fontWeight: "bold",
        userSelect: "none",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span>📜</span> Historial de Sesión
        </div>
        <button
          onClick={() => setVisible(false)}
          style={{
            width: "16px", height: "14px",
            background: "linear-gradient(180deg, #d0d0d0 0%, #a0a0a0 100%)",
            border: "1px solid #000",
            borderTopColor: "#fff",
            borderLeftColor: "#fff",
            color: "#000",
            fontSize: "9px",
            fontFamily: "Tahoma, Arial, sans-serif",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 0,
          }}
        >✕</button>
      </div>

      {/* Content */}
      <div style={{ padding: "6px" }}>
        {history.length === 0 ? (
          <div style={{
            padding: "16px",
            textAlign: "center",
            color: W.shadow,
            fontSize: "11px",
            fontFamily: "Tahoma, Arial, sans-serif",
          }}>
            Sin historial aún.
          </div>
        ) : (
          <>
            <div style={{
              background: "#fff",
              border: "2px solid",
              borderColor: `${W.dkShadow} ${W.hilight} ${W.hilight} ${W.dkShadow}`,
              maxHeight: "280px",
              overflowY: "auto",
            }}>
              {history.map((entry, i) => (
                <div
                  key={entry.id}
                  onClick={() => onRestore?.(entry)}
                  style={{
                    padding: "4px 8px",
                    borderBottom: i < history.length - 1 ? "1px solid #d4d0c8" : "none",
                    cursor: "pointer",
                    fontFamily: "Tahoma, Arial, sans-serif",
                    fontSize: "11px",
                  }}
                  onMouseOver={e => { e.currentTarget.style.background = W.selBlue; e.currentTarget.style.color = W.selText; }}
                  onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#000"; }}
                >
                  <div style={{ fontWeight: "bold" }}>{entry.topic}</div>
                  <div style={{ fontSize: "10px", color: W.shadow }}>
                    {entry.actionId} · {new Date(entry.timestamp).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "6px", display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={onClear}
                style={{
                  ...winBtn,
                  color: "#cc0000",
                  fontSize: "11px",
                  padding: "2px 10px",
                }}
              >
                Limpiar historial
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
