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
    if (!apiKey?.trim()) { setError("Configura tu API Key en la sección superior."); return; }
    if (!topic?.trim()) { setError("Define un tema de investigación primero."); return; }
    
    setLoading(true);
    setError(null);
    
    const output = await onGenerate({ action, topic, content });
    
    if (output) {
      setResult(output);
      setDone(true);
      onHistoryAdd?.(topic, action.id, output);
    } else {
      setError("Fallo en la comunicación con la consciencia de Gemini.");
    }
    
    setLoading(false);
  };

  const accentColor = action.meta.color;
  const obsidianBG = "rgba(10, 10, 10, 0.85)";

  return (
    <div style={{
      background: open ? "rgba(15, 15, 15, 0.98)" : "rgba(15, 15, 15, 0.4)",
      backdropFilter: "blur(20px)",
      border: `1px solid ${open ? accentColor + "55" : "rgba(212, 175, 55, 0.08)"}`,
      borderRadius: "18px",
      overflow: "hidden",
      marginBottom: "12px",
      transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      boxShadow: open ? `0 10px 30px rgba(0,0,0,0.6)` : "none",
      transform: open ? "scale(1.02)" : "scale(1)",
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", background: "none", border: "none",
          padding: "20px 24px", cursor: "pointer",
          display: "flex", alignItems: "center", gap: "16px", textAlign: "left",
          transition: "background 0.3s"
        }}
        onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
        onMouseOut={e => e.currentTarget.style.background = "none"}
      >
        <div style={{
          width: "40px", height: "40px", borderRadius: "10px",
          display: "flex", alignItems: "center", justifyContent: "center",
          background: done ? "#10b98122" : accentColor + "11",
          border: `1px solid ${done ? "#10b98144" : accentColor + "33"}`,
          color: done ? "#10b981" : accentColor,
          fontSize: "20px", transition: "all 0.3s"
        }}>
          {done ? "✓" : action.meta.icon}
        </div>
        
        <div style={{ flex: 1 }}>
          <h4 style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "13px",
            color: done ? "#10b981" : "#f0e6d2", fontWeight: "700", 
            letterSpacing: "0.02em", margin: 0
          }}>{action.ui.title}</h4>
          <p style={{ 
            fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(240, 230, 210, 0.4)", 
            marginTop: "4px", fontWeight: "300" 
          }}>
            {action.ui.when}
          </p>
        </div>

        <div style={{
          width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center",
          color: "rgba(212, 175, 55, 0.3)", transform: open ? "rotate(180deg)" : "none",
          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
        }}>▾</div>
      </button>

      {open && (
        <div style={{ padding: "0 24px 24px", animation: "reveal 0.4s ease-out" }}>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "rgba(240, 230, 210, 0.7)",
            margin: "0 0 20px", lineHeight: "1.6", fontWeight: "300"
          }}>{action.ui.desc}</p>

          <button
            onClick={handleGenerate}
            disabled={loading}
            style={{
              width: "100%",
              background: loading 
                ? "rgba(212, 175, 55, 0.05)" 
                : `linear-gradient(135deg, ${accentColor}11, ${accentColor}05)`,
              border: `1px solid ${accentColor}44`,
              color: loading ? "rgba(212, 175, 55, 0.3)" : accentColor,
              padding: "16px",
              borderRadius: "12px",
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.2em",
              fontWeight: "700",
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              boxShadow: `0 4px 15px rgba(0,0,0,0.2)`
            }}
            onMouseOver={e => !loading && (e.currentTarget.style.boxShadow = `0 0 20px ${accentColor}22`, e.currentTarget.style.borderColor = accentColor)}
            onMouseOut={e => !loading && (e.currentTarget.style.boxShadow = "none", e.currentTarget.style.borderColor = accentColor + "44")}
          >
            {loading ? "PROCESANDO PENSAMIENTO..." : result ? "↺ RE-INICIAR PROTOCOLO" : "⚡ EJECUTAR PROTOCOLO IA"}
          </button>

          {loading && <div style={{ marginTop: "20px" }}><Spinner color={accentColor} /></div>}
          
          {error && (
            <div style={{
              marginTop: "16px", padding: "14px 18px",
              background: "rgba(239, 68, 68, 0.05)", border: "1px solid rgba(239, 68, 68, 0.2)",
              borderRadius: "10px", fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px", color: "#ef4444", animation: "reveal 0.3s ease-out"
            }}>⚠ {error}</div>
          )}
          
          {result && <ResultBlock text={result} color={accentColor} topic={topic} />}
        </div>
      )}
    </div>
  );
}