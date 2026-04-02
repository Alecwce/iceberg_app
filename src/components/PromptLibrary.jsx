import React, { useState } from "react";
import { ACTIONS } from "../data/actions";

export default function PromptLibrary() {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto", animation: "fadeIn 0.5s ease-out" }}>
      <header style={{ marginBottom: "30px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "28px", color: "#e8d5a3", marginBottom: "8px" }}>
          Librería de Prompts 🧊
        </h2>
        <p style={{ fontFamily: "Georgia, serif", fontSize: "14px", color: "#6a5a38", lineHeight: "1.6" }}>
          Explora la ingeniería detrás de cada acción de estudio profundo.
        </p>
      </header>

      <div style={{ display: "grid", gap: "20px" }}>
        {ACTIONS.map((action) => (
          <div
            key={action.id}
            style={{
              background: "rgba(18,16,10,0.6)",
              backdropFilter: "blur(12px)",
              border: `1px solid ${action.meta.color}22`,
              borderRadius: "16px",
              padding: "24px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              transition: "transform 0.2s",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <span style={{ 
                color: action.meta.color, 
                fontSize: "20px", 
                fontFamily: "'DM Mono', monospace" 
              }}>{action.meta.icon}</span>
              <div>
                <h3 style={{ 
                  fontFamily: "'DM Mono', monospace", 
                  fontSize: "16px", 
                  color: "#e8d5a3", 
                  margin: 0,
                  letterSpacing: "0.05em"
                }}>
                  {action.ui.title}
                </h3>
                <span style={{ 
                  fontFamily: "Georgia, serif", 
                  fontSize: "11px", 
                  color: "#6a5a38",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em"
                }}>
                  System Prompt
                </span>
              </div>
            </div>

            <div style={{ position: "relative" }}>
              <pre style={{
                background: "rgba(0,0,0,0.4)",
                padding: "16px",
                borderRadius: "10px",
                fontSize: "12.5px",
                color: "#c4b890",
                lineHeight: "1.7",
                whiteSpace: "pre-wrap",
                fontFamily: "'DM Mono', monospace",
                border: "1px solid rgba(180,150,80,0.1)",
                maxHeight: "300px",
                overflowY: "auto",
                marginBottom: "0"
              }}>
                {action.ai.system}
              </pre>
              
              <button
                onClick={() => handleCopy(action.id, action.ai.system)}
                aria-label={`Copiar prompt de ${action.ui.title}`}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: copiedId === action.id ? "rgba(52,211,153,0.2)" : "rgba(180,130,40,0.2)",
                  border: `1px solid ${copiedId === action.id ? "#34d399" : "rgba(180,150,80,0.3)"}`,
                  color: copiedId === action.id ? "#34d399" : "#a89a78",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  fontSize: "10px",
                  cursor: "pointer",
                  fontFamily: "'DM Mono', monospace",
                  transition: "all 0.2s",
                  backdropFilter: "blur(4px)"
                }}
              >
                {copiedId === action.id ? "✓ COPIADO" : "COPIAR"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
