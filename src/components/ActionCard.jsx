import React, { useState } from "react";
import Spinner from "./Spinner";
import ResultBlock from "./ResultBlock";

export default function ActionCard({ action, topic, content, apiKey, onGenerate, onHistoryAdd }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);

  const handleGenerate = async () => {
    if (!apiKey?.trim()) { setError("Ingresa tu API key de Gemini primero."); return; }
    if (!topic?.trim()) { setError("Ingresa el tema a estudiar."); return; }
    
    setLoading(true);
    setError(null);
    
    const output = await onGenerate({
      action,
      topic,
      content
    });
    
    if (output) {
      setResult(output);
      setDone(true);
      onHistoryAdd?.(topic, action.id, output);
    } else {
      setError("Error al generar contenido");
    }
    
    setLoading(false);
  };

  const color = action.meta.color;

  return (
    <div style={{
      background: open ? "rgba(18,16,10,0.95)" : "rgba(18,16,10,0.5)",
      border: `1px solid ${open ? color + "44" : "rgba(180,150,80,0.1)"}`,
      borderRadius: "10px",
      overflow: "hidden",
      marginBottom: "8px",
      transition: "all 0.2s",
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", background: "none", border: "none",
          padding: "14px 16px", cursor: "pointer",
          display: "flex", alignItems: "center", gap: "12px", textAlign: "left",
        }}
      >
        <span style={{
          fontFamily: "'DM Mono', monospace", fontSize: "17px",
          color: done ? "#6ee7b7" : color,
          minWidth: "20px", textAlign: "center",
        }}>{done ? "✓" : action.meta.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: "'DM Mono', monospace", fontSize: "12px",
            color: done ? "#6ee7b7" : "#e8d5a3", fontWeight: "bold", letterSpacing: "0.03em",
          }}>{action.ui.title}</div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: "11px", color: "#6a5a38", marginTop: "2px" }}>
            {action.ui.when}
          </div>
        </div>
        <span style={{
          color: "#4a3c22", fontSize: "11px",
          transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s",
        }}>▾</span>
      </button>

      {open && (
        <div style={{ padding: "0 16px 18px" }}>
          <p style={{
            fontFamily: "Georgia, serif", fontSize: "12px", color: "#6a5a38",
            margin: "0 0 12px", lineHeight: "1.5",
          }}>{action.ui.desc}</p>

          <button
            onClick={handleGenerate}
            disabled={loading}
            style={{
              width: "100%",
              background: loading
                ? "rgba(180,130,40,0.08)"
                : `linear-gradient(135deg, ${color}22, ${color}11)`,
              border: `1px solid ${color}55`,
              color: loading ? "#7a6a4a" : color,
              padding: "13px",
              borderRadius: "8px",
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "'DM Mono', monospace",
              fontSize: "12px",
              letterSpacing: "0.12em",
              fontWeight: "bold",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: result ? `0 0 15px ${color}11` : "none",
            }}
            onMouseOver={(e) => !loading && (e.currentTarget.style.filter = "brightness(1.5)")}
            onMouseOut={(e) => !loading && (e.currentTarget.style.filter = "none")}
          >
            {loading ? "GENERANDO..." : result ? "↺ REGENERAR CON GEMINI" : "⚡ GENERAR CON GEMINI"}
          </button>

          {loading && <Spinner color={color} />}
          {error && (
            <div style={{
              marginTop: "10px", padding: "10px 12px",
              background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)",
              borderRadius: "7px", fontFamily: "'DM Mono', monospace",
              fontSize: "11px", color: "#f87171",
            }}>⚠ {error}</div>
          )}
          {result && <ResultBlock text={result} color={color} topic={topic} />}
        </div>
      )}
    </div>
  );
}