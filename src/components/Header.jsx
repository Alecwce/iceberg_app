import React from "react";

export default function Header() {
  return (
    <div style={{
      padding: "24px 20px 18px",
      borderBottom: "1px solid rgba(180,150,80,0.1)",
      background: "rgba(0,0,0,0.4)",
    }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <div style={{
          fontFamily: "'DM Mono', monospace", fontSize: "9px",
          color: "#5a4a2a", letterSpacing: "0.25em", marginBottom: "6px",
        }}>
          🧊 ICEBERG DE LOS APUNTES v3 · IA INTEGRADA
        </div>
        <h1 style={{
          margin: "0 0 3px",
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "22px", color: "#f0d898", fontWeight: "700",
        }}>
          Aprende cualquier tema con IA
        </h1>
        <p style={{
          margin: 0, fontFamily: "Georgia, serif",
          fontSize: "12px", color: "#6a5a38",
        }}>
          Powered by Gemini 2.5 Flash · gratis, sin tarjeta de crédito
        </p>
      </div>
    </div>
  );
}