import React from "react";

export default function Header() {
  return (
    <header style={{
      background: "linear-gradient(180deg, #0a246a 0%, #3a6ea5 100%)",
      padding: "0",
      marginBottom: "0",
      borderBottom: "2px solid #0a246a",
    }}>
      {/* Title Bar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "3px 4px",
        background: "linear-gradient(180deg, #0a246a 0%, #3a6ea5 100%)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {/* App Icon */}
          <div style={{
            width: "20px", height: "20px",
            background: "linear-gradient(135deg, #87ceeb, #1e90ff)",
            border: "1px solid #000080",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "12px", flexShrink: 0
          }}>🧊</div>
          <span style={{
            color: "#fff",
            fontFamily: "Tahoma, 'MS Sans Serif', Arial, sans-serif",
            fontSize: "11px",
            fontWeight: "bold",
            letterSpacing: "0.02em",
          }}>
            Iceberg Prompts - Aprende con IA
          </span>
        </div>
        {/* Window Controls */}
        <div style={{ display: "flex", gap: "2px" }}>
          {["_", "□", "✕"].map((btn, i) => (
            <button key={i} style={{
              width: "16px", height: "14px",
              background: "linear-gradient(180deg, #d0d0d0 0%, #a0a0a0 100%)",
              border: "1px solid #000",
              borderTopColor: "#fff",
              borderLeftColor: "#fff",
              color: "#000",
              fontSize: "9px",
              fontFamily: "Tahoma, Arial, sans-serif",
              cursor: "default",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: 0,
              lineHeight: 1,
            }}>{btn}</button>
          ))}
        </div>
      </div>

      {/* Menu Bar */}
      <div style={{
        background: "#d4d0c8",
        borderBottom: "1px solid #808080",
        padding: "2px 4px",
        display: "flex",
        gap: "0px",
      }}>
        {["Archivo", "Editar", "Ver", "Herramientas", "Ayuda"].map((item) => (
          <button key={item} style={{
            background: "none",
            border: "none",
            padding: "2px 8px",
            fontFamily: "Tahoma, 'MS Sans Serif', Arial, sans-serif",
            fontSize: "11px",
            cursor: "default",
            color: "#000",
          }}
          onMouseOver={e => { e.currentTarget.style.background = "#0a246a"; e.currentTarget.style.color = "#fff"; }}
          onMouseOut={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#000"; }}
          >{item}</button>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{
        background: "#d4d0c8",
        borderBottom: "2px solid #808080",
        borderBottomColor: "#808080",
        padding: "3px 6px",
        display: "flex",
        alignItems: "center",
        gap: "4px",
      }}>
        <div style={{
          textAlign: "center",
          padding: "6px 16px",
          flex: 1,
        }}>
          <h1 style={{
            margin: 0,
            fontFamily: "Tahoma, 'MS Sans Serif', Arial, sans-serif",
            fontSize: "18px",
            color: "#000080",
            fontWeight: "bold",
          }}>
            Iceberg Prompts
          </h1>
          <p style={{
            margin: "2px 0 0",
            fontFamily: "Tahoma, 'MS Sans Serif', Arial, sans-serif",
            fontSize: "11px",
            color: "#444",
          }}>
            Arquitectura de aprendizaje potenciada por{" "}
            <span style={{ color: "#000080", fontWeight: "bold" }}>Gemini 1.5 Flash</span>
            {" "}· Diseñado para la maestría intelectual.
          </p>
        </div>
      </div>
    </header>
  );
}
