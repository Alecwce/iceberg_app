import React, { useState } from "react";
import Spinner from "./Spinner";
import ResultBlock from "./ResultBlock";

const W = {
  face:    "#d4d0c8",
  shadow:  "#808080",
  dkShadow:"#404040",
  hilight: "#ffffff",
  btnText: "#000000",
  selBlue: "#0a246a",
  selText: "#ffffff",
  inset:   "#ffffff",
};

const raised = {
  background: W.face,
  border: "2px solid",
  borderColor: `${W.hilight} ${W.dkShadow} ${W.dkShadow} ${W.hilight}`,
};

const winBtn = {
  ...raised,
  fontFamily: "Tahoma, 'MS Sans Serif', Arial, sans-serif",
  fontSize: "11px",
  color: W.btnText,
  padding: "3px 12px",
  cursor: "pointer",
  minHeight: "23px",
  userSelect: "none",
  background: W.face,
};

export default function ActionCard({ action, topic, content, apiKey, onGenerate, onHistoryAdd }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);
  const [pressed, setPressed] = useState(false);

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
      setError("Fallo en la comunicación con Gemini.");
    }

    setLoading(false);
  };

  return (
    <div style={{
      background: W.face,
      border: "2px solid",
      borderColor: `${W.hilight} ${W.dkShadow} ${W.dkShadow} ${W.hilight}`,
      marginBottom: "4px",
    }}>
      {/* Card Header Row */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          background: open ? W.selBlue : W.face,
          border: "none",
          padding: "4px 8px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          textAlign: "left",
        }}
      >
        {/* Expand indicator */}
        <span style={{
          width: "9px", height: "9px",
          border: "1px solid " + (open ? "#aaa" : W.shadow),
          background: open ? "#c0c0c0" : "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "8px", lineHeight: 1, flexShrink: 0,
          color: "#000",
        }}>
          {open ? "−" : "+"}
        </span>

        {/* Icon */}
        <span style={{
          fontSize: "14px",
          width: "20px",
          textAlign: "center",
          flexShrink: 0,
          filter: open ? "brightness(10)" : "none",
        }}>
          {done ? "✓" : action.meta.icon}
        </span>

        {/* Title & subtitle */}
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: "Tahoma, 'MS Sans Serif', Arial, sans-serif",
            fontSize: "11px",
            fontWeight: open ? "bold" : "normal",
            color: open ? W.selText : (done ? "#006600" : W.btnText),
          }}>
            {action.ui.title}
            {done && !open && (
              <span style={{ color: "#006600", marginLeft: "6px", fontWeight: "bold" }}>✓ Completado</span>
            )}
          </div>
          <div style={{
            fontFamily: "Tahoma, 'MS Sans Serif', Arial, sans-serif",
            fontSize: "10px",
            color: open ? "rgba(255,255,255,0.75)" : W.shadow,
            marginTop: "1px",
          }}>
            {action.ui.when}
          </div>
        </div>

        <span style={{
          color: open ? "rgba(255,255,255,0.6)" : W.shadow,
          fontSize: "9px",
          flexShrink: 0,
          transform: open ? "rotate(180deg)" : "none",
        }}>▼</span>
      </button>

      {open && (
        <div style={{ padding: "8px 12px 12px" }}>
          {/* Description in sunken box */}
          <div style={{
            background: "#fff",
            border: "2px solid",
            borderColor: `${W.dkShadow} ${W.hilight} ${W.hilight} ${W.dkShadow}`,
            padding: "6px 8px",
            fontSize: "11px",
            fontFamily: "Tahoma, Arial, sans-serif",
            color: "#000",
            lineHeight: "1.5",
            marginBottom: "8px",
          }}>
            {action.ui.desc}
          </div>

          {/* Generate button */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "4px" }}>
            <button
              onClick={handleGenerate}
              disabled={loading}
              onMouseDown={() => setPressed(true)}
              onMouseUp={() => setPressed(false)}
              onMouseLeave={() => setPressed(false)}
              style={{
                ...winBtn,
                padding: "4px 20px",
                fontWeight: "bold",
                border: loading ? "2px inset #808080" : (pressed ? "2px solid" : "2px solid"),
                borderColor: loading
                  ? "#808080"
                  : (pressed
                    ? `${W.dkShadow} ${W.hilight} ${W.hilight} ${W.dkShadow}`
                    : `${W.hilight} ${W.dkShadow} ${W.dkShadow} ${W.hilight}`),
                cursor: loading ? "default" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Procesando..." : result ? "↺ Reiniciar" : "⚡ Ejecutar Protocolo IA"}
            </button>
          </div>

          {loading && <div style={{ marginTop: "8px" }}><Spinner /></div>}

          {error && (
            <div style={{
              marginTop: "8px",
              padding: "6px 10px",
              background: "#fff0f0",
              border: "2px solid",
              borderColor: `${W.dkShadow} ${W.hilight} ${W.hilight} ${W.dkShadow}`,
              fontFamily: "Tahoma, Arial, sans-serif",
              fontSize: "11px",
              color: "#cc0000",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}>
              <span style={{ fontSize: "16px" }}>⚠</span>
              {error}
            </div>
          )}

          {result && <ResultBlock text={result} color={action.meta.color} topic={topic} />}
        </div>
      )}
    </div>
  );
}
