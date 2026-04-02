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
    <div className="prompt-library">
      <header className="library-header">
        <h2>Librería de Prompts 🧊</h2>
        <p className="subtitle">
          Explora la ingeniería detrás de cada acción de estudio profundo.
        </p>
      </header>

      <div className="library-grid">
        {ACTIONS.map((action) => (
          <div key={action.id} className="prompt-card">
            <div className="card-header">
              <span className="icon" style={{ color: action.meta.color }}>
                {action.meta.icon}
              </span>
              <div>
                <h3 className="title">{action.ui.title}</h3>
                <span className="type">System Prompt</span>
              </div>
            </div>

            <div className="prompt-viewer">
              <pre>{action.ai.system}</pre>
              
              <button
                onClick={() => handleCopy(action.id, action.ai.system)}
                aria-label={`Copiar prompt de ${action.ui.title}`}
                className={`prompt-copy-btn ${copiedId === action.id ? 'copied' : ''}`}
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
