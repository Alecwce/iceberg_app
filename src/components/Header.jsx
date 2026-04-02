import React from "react";

export default function Header() {
  return (
    <header style={{
      padding: "48px 24px 32px",
      textAlign: "center",
      borderBottom: "1px solid rgba(212, 175, 55, 0.08)",
      background: "radial-gradient(circle at center, rgba(212,175,55,0.02) 0%, transparent 70%)",
      marginBottom: "20px"
    }}>
      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace", 
          fontSize: "9px",
          color: "rgba(212,175,55,0.4)", 
          letterSpacing: "0.45em", 
          marginBottom: "16px",
          textTransform: "uppercase"
        }}>
          🧊 Deep Obsidian & Liquid Gold v3.2
        </div>
        
        <h1 style={{
          margin: "0 0 12px",
          fontFamily: "'Playfair Display', serif",
          fontSize: "42px", 
          color: "#f0e6d2", 
          fontWeight: "900",
          letterSpacing: "-0.02em",
          lineHeight: "1.0",
          textShadow: "0 4px 15px rgba(0,0,0,0.8)"
        }}>
          Iceberg Prompts
        </h1>
        
        <p style={{
          margin: "0 auto", 
          maxWidth: "420px",
          fontFamily: "'Inter', sans-serif",
          fontSize: "13px", 
          color: "#8a7a5a",
          lineHeight: "1.6",
          fontWeight: "300",
          letterSpacing: "0.01em"
        }}>
          Arquitectura de aprendizaje profundo potenciada por la inteligencia de <span style={{ color: "#d4af37", fontWeight: "600" }}>Gemini 1.5 Flash</span>. 
          Diseñado para la maestría intelectual.
        </p>
      </div>
    </header>
  );
}