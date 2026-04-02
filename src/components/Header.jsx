import React from "react";

export default function Header({ activeModel = "gemini-2.5-flash" }) {
  const modelNames = {
    "gemini-2.5-flash": "Gemini 2.5 Flash",
    "gemini-2.5-flash-lite": "Gemini 2.5 Flash-Lite",
    "gemini-2.5-pro": "Gemini 2.5 Pro",
    "gemini-2.0-flash": "Gemini 2.0 Flash",
  };

  return (
    <header className="app-header">
      <div className="header-inner">
        <div className="version-tag">
          🧊 Deep Obsidian & Liquid Gold v3.2
        </div>
        
        <h1>Iceberg Prompts</h1>
        
        <p className="description">
          Arquitectura de aprendizaje profundo potenciada por la inteligencia de <span className="highlight">{modelNames[activeModel] || activeModel}</span>. 
          Diseñado para la maestría intelectual.
        </p>
      </div>
    </header>
  );
}