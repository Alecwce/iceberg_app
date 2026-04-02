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

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : "212, 175, 55";
  };

  const accentRgb = hexToRgb(action.meta.color);

  return (
    <div 
      className={`action-card ${open ? 'open' : ''}`}
      style={{ '--accent-rgb': accentRgb }}
    >
      <button className="header-btn" onClick={() => setOpen(!open)}>
        <div className={`icon-box ${done ? 'done' : ''}`}>
          {done ? "✓" : action.meta.icon}
        </div>
        
        <div className="title-area">
          <h4 className={done ? 'done' : ''}>{action.ui.title}</h4>
          <p>{action.ui.when}</p>
        </div>

        <div className="chevron">▾</div>
      </button>

      {open && (
        <div className="content-body stagger-reveal">
          <p className="description">{action.ui.desc}</p>

          <button
            className="execute-btn"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? "PROCESANDO PENSAMIENTO..." : result ? "↺ RE-INICIAR PROTOCOLO" : "⚡ EJECUTAR PROTOCOLO IA"}
          </button>

          {loading && <div style={{ marginTop: "20px" }}><Spinner color={action.meta.color} /></div>}
          
          {error && (
            <div className="error-box stagger-reveal">⚠ {error}</div>
          )}
          
          {result && <ResultBlock text={result} color={action.meta.color} topic={topic} />}
        </div>
      )}
    </div>
  );
}