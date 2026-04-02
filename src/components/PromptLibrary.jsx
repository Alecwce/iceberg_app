import React, { useState } from "react";
import { ACTIONS } from "../data/actions";

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
  userSelect: "none",
};

export default function PromptLibrary() {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div style={{ padding: "0" }}>
      {/* Header */}
      <div style={{
        background: W.selBlue,
        color: W.selText,
        padding: "4px 8px",
        fontFamily: "Tahoma, Arial, sans-serif",
        fontSize: "11px",
        fontWeight: "bold",
        marginBottom: "8px",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        border: "2px solid",
        borderColor: `${W.hilight} ${W.dkShadow} ${W.dkShadow} ${W.hilight}`,
      }}>
        <span>📚</span>
        Librería de Prompts — Ingeniería de cada acción
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {ACTIONS.map((action) => (
          <div
            key={action.id}
            style={{
              background: W.face,
              border: "2px solid",
              borderColor: `${W.hilight} ${W.dkShadow} ${W.dkShadow} ${W.hilight}`,
            }}
          >
            {/* Action header */}
            <div style={{
              background: "#bab8b0",
              padding: "4px 8px",
              borderBottom: "1px solid " + W.shadow,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "Tahoma, Arial, sans-serif",
              fontSize: "11px",
              fontWeight: "bold",
            }}>
              <span>{action.meta.icon}</span>
              <span>{action.ui.title}</span>
              <span style={{
                marginLeft: "auto",
                fontFamily: "Tahoma, Arial, sans-serif",
                fontSize: "10px",
                color: W.shadow,
                fontWeight: "normal",
              }}>System Prompt</span>
            </div>

            {/* Prompt text */}
            <div style={{ position: "relative", padding: "4px" }}>
              <pre style={{
                background: "#fff",
                border: "2px solid",
                borderColor: `${W.dkShadow} ${W.hilight} ${W.hilight} ${W.dkShadow}`,
                padding: "6px 8px",
                fontSize: "11px",
                color: "#000",
                lineHeight: "1.5",
                whiteSpace: "pre-wrap",
                fontFamily: "Tahoma, 'Courier New', monospace",
                maxHeight: "200px",
                overflowY: "auto",
                margin: 0,
              }}>
                {action.ai.system}
              </pre>

              <div style={{ 
                display: "flex", 
                justifyContent: "flex-end",
                marginTop: "4px",
              }}>
                <button
                  onClick={() => handleCopy(action.id, action.ai.system)}
                  aria-label={`Copiar prompt de ${action.ui.title}`}
                  style={{
                    ...winBtn,
                    background: copiedId === action.id ? "#e0ffe0" : W.face,
                    fontWeight: copiedId === action.id ? "bold" : "normal",
                    minWidth: "100px",
                  }}
                >
                  {copiedId === action.id ? "✓ Copiado!" : "Copiar"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
