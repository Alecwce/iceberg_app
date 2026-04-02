import React from "react";

const W = {
  face:    "#d4d0c8",
  shadow:  "#808080",
  dkShadow:"#404040",
  hilight: "#ffffff",
};

export default function ToastContainer({ toasts }) {
  if (toasts.length === 0) return null;

  const getConfig = (type) => {
    switch (type) {
      case "success": return { icon: "✓", bg: "#e0ffe0", border: "#008000", color: "#004000", titleBg: "#008000", titleColor: "#fff", title: "Información" };
      case "error":   return { icon: "✕", bg: "#fff0f0", border: "#cc0000", color: "#800000", titleBg: "#cc0000", titleColor: "#fff", title: "Error" };
      default:        return { icon: "ℹ", bg: "#ffffd0", border: "#808000", color: "#404000", titleBg: "#000080", titleColor: "#fff", title: "Aviso" };
    }
  };

  return (
    <div style={{ position: "fixed", top: "16px", right: "16px", zIndex: 9999, display: "flex", flexDirection: "column", gap: "6px" }}>
      {toasts.map(t => {
        const cfg = getConfig(t.type);
        return (
          <div
            key={t.id}
            style={{
              background: W.face,
              border: "2px solid",
              borderColor: `${W.hilight} ${W.dkShadow} ${W.dkShadow} ${W.hilight}`,
              width: "280px",
              boxShadow: "4px 4px 8px rgba(0,0,0,0.4)",
            }}
          >
            {/* Title bar */}
            <div style={{
              background: `linear-gradient(180deg, ${cfg.titleBg} 0%, ${cfg.titleBg}cc 100%)`,
              color: cfg.titleColor,
              padding: "2px 6px",
              fontSize: "11px",
              fontFamily: "Tahoma, Arial, sans-serif",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}>
              <span>{cfg.icon}</span>
              {cfg.title}
            </div>
            {/* Body */}
            <div style={{
              padding: "10px 12px",
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              background: cfg.bg,
              borderTop: `2px solid ${W.dkShadow}`,
            }}>
              <span style={{ fontSize: "22px", lineHeight: 1, flexShrink: 0 }}>
                {type === "success" ? "✓" : type === "error" ? "⚠" : "ℹ"}
              </span>
              <span style={{
                fontFamily: "Tahoma, 'MS Sans Serif', Arial, sans-serif",
                fontSize: "11px",
                color: cfg.color,
                lineHeight: "1.5",
              }}>
                {t.message}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
