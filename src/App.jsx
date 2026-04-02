import React, { useState, useRef } from "react";
import { ACTIONS, LEVEL_GROUPS } from "./data/actions";
import { useGemini } from "./hooks/useGemini";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useHistory } from "./hooks/useHistory";
import { useFavorites } from "./hooks/useFavorites";
import { useAppShortcuts } from "./hooks/useKeyboardShortcuts";
import { useToast } from "./hooks/useToast";
import Header from "./components/Header";
import ActionCard from "./components/ActionCard";
import HistoryPanel from "./components/HistoryPanel";
import FavoritesPanel from "./components/FavoritesPanel";
import ToastContainer from "./components/ToastContainer";
import PromptLibrary from "./components/PromptLibrary";

export default function App() {
  const [apiKey, setApiKey] = useLocalStorage("iceberg-apiKey", "");
  const [showKey, setShowKey] = useState(false);
  const [topic, setTopic] = useLocalStorage("iceberg-topic", "");
  const [content, setContent] = useLocalStorage("iceberg-content", "");
  const [showContent, setShowContent] = useState(false);
  const [activeGroup, setActiveGroup] = useState(0);
  const [view, setView] = useState("app"); // 'app' | 'prompts'
  
  const { generate, loading: generating } = useGemini();
  const { history, addEntry, clearHistory } = useHistory();
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { toasts, success, error } = useToast();
  const generateRef = useRef(null);

  useAppShortcuts({
    onToggleKey: () => setShowKey(s => !s),
    onToggleContent: () => setShowContent(s => !s),
    onGenerate: () => generateRef.current?.(),
    onNextTab: () => setActiveGroup(g => (g + 1) % 3),
    onPrevTab: () => setActiveGroup(g => (g - 1 + 3) % 3),
  });

  const group = LEVEL_GROUPS[activeGroup];
  const groupActions = ACTIONS.filter(a => group.ids.includes(a.id));

  const handleGenerate = async ({ action, topic, content }) => {
    const userPrompt = action.ai.build({ topic, content });
    return await generate({
      apiKey,
      systemPrompt: action.ai.system,
      userPrompt
    });
  };

  return (
    <main role="main" style={{
      minHeight: "100vh",
      background: "#0a0904",
      backgroundImage: `
        radial-gradient(circle at 50% -20%, rgba(180,130,40,0.12) 0%, transparent 60%),
        url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a08040' fill-opacity='0.02'%3E%3Cpath d='M20 20.5V18H0v5h5v5H0v5h20v-9.5zm-2 4.5H4v-4h14v4zm0-7H4v-2h14v2zm2 0h2v2h-2v-2zm4 0h14v2H24v-2zm0 4h14v4H24v-4z'/%3E%3C/g%3E%3C/svg%3E")
      `,
      backgroundAttachment: "fixed",
      color: "#e8d5a3",
      animation: "bgPulse 30s ease-in-out infinite",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Playfair+Display:wght@700&display=swap');
        * { box-sizing: border-box; }
        input, textarea { outline: none; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(180,130,40,0.2); border-radius: 4px; }
        input::placeholder, textarea::placeholder { color: #5a4a2a; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes bgPulse { 0% { background-position: 0% 0%; } 50% { background-position: 100% 100%; } 100% { background-position: 0% 0%; } }
      `}</style>

      <Header />

      {/* View Selector */}
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "20px", marginTop: "10px" }}>
        <button
          onClick={() => setView("app")}
          style={{
            background: "none",
            border: "none",
            color: view === "app" ? "#f59e0b" : "#6a5a3a",
            fontFamily: "'DM Mono', monospace",
            fontSize: "11px",
            letterSpacing: "0.2em",
            cursor: "pointer",
            padding: "8px 12px",
            borderBottom: view === "app" ? "1px solid #f59e0b" : "1px solid transparent",
            transition: "all 0.3s",
          }}
        >
          APLICACIÓN
        </button>
        <button
          onClick={() => setView("prompts")}
          style={{
            background: "none",
            border: "none",
            color: view === "prompts" ? "#f59e0b" : "#6a5a3a",
            fontFamily: "'DM Mono', monospace",
            fontSize: "11px",
            letterSpacing: "0.2em",
            cursor: "pointer",
            padding: "8px 12px",
            borderBottom: view === "prompts" ? "1px solid #f59e0b" : "1px solid transparent",
            transition: "all 0.3s",
          }}
        >
          LIBRERÍA DE PROMPTS
        </button>
      </div>

      {view === "app" ? (
        <>
          {/* API Key + Inputs */}
          <div style={{ padding: "0 20px", maxWidth: "600px", margin: "0 auto" }}>
            {/* API Key */}
            <div style={{
              background: "rgba(180,130,40,0.06)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(180,150,80,0.18)",
              borderRadius: "12px",
              padding: "16px",
              marginBottom: "12px",
              animation: "fadeIn 0.5s ease-out",
            }}>
              <label style={{
                fontFamily: "'DM Mono', monospace", fontSize: "10px",
                color: "#7a6a4a", letterSpacing: "0.15em", display: "block", marginBottom: "8px",
              }}>
                🔑 GEMINI API KEY —{" "}
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#c4a84a", textDecoration: "none", borderBottom: "1px solid rgba(196,168,74,0.3)" }}
                >
                  Obtener gratis →
                </a>
              </label>
              <div style={{ position: "relative" }}>
                <input
                  aria-label="Gemini API Key"
                  type={showKey ? "text" : "password"}
                  value={apiKey}
                  onChange={e => setApiKey(e.target.value)}
                  placeholder="AIza..."
                  style={{
                    width: "100%", background: "rgba(0,0,0,0.5)",
                    border: `1px solid ${apiKey ? "rgba(180,150,80,0.4)" : "rgba(180,150,80,0.18)"}`,
                    borderRadius: "8px", padding: "12px 50px 12px 14px",
                    color: "#f0d898", fontFamily: "'DM Mono', monospace", fontSize: "14px",
                    transition: "all 0.2s",
                  }}
                />
                <button
                  aria-label={showKey ? "Ocultar API Key" : "Mostrar API Key"}
                  onClick={() => setShowKey(!showKey)}
                  style={{
                    position: "absolute", right: "8px", top: "50%",
                    transform: "translateY(-50%)",
                    background: "rgba(180,150,80,0.08)", 
                    border: "1px solid rgba(180,150,80,0.15)", 
                    borderRadius: "6px",
                    cursor: "pointer",
                    color: "#8a7a5a", 
                    fontSize: "18px", 
                    padding: "0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: "36px",
                    minHeight: "36px",
                    transition: "all 0.2s",
                  }}
                >{showKey ? "🙈" : "👁"}</button>
              </div>
              {apiKey && (
                <div style={{
                  marginTop: "8px", fontFamily: "'DM Mono', monospace",
                  fontSize: "10px", color: "#6ee7b7", letterSpacing: "0.1em",
                  display: "flex", alignItems: "center", gap: "6px"
                }}>
                  <span style={{ fontSize: "12px" }}>✓</span> API key ingresada
                </div>
              )}
            </div>

            {/* Topic + Content */}
            <div style={{
              background: "rgba(180,130,40,0.04)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(180,150,80,0.14)",
              borderRadius: "12px",
              padding: "16px",
              marginBottom: "8px",
              animation: "fadeIn 0.6s ease-out",
            }}>
              <label style={{
                fontFamily: "'DM Mono', monospace", fontSize: "10px",
                color: "#7a6a4a", letterSpacing: "0.15em", display: "block", marginBottom: "8px",
              }}>TEMA A ESTUDIAR</label>
              <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
                <input
                  aria-label="Tema a estudiar"
                  type="text"
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                  placeholder="ej: Fotosíntesis, Revolución Francesa..."
                  style={{
                    flex: 1, background: "rgba(0,0,0,0.4)",
                    border: "1px solid rgba(180,150,80,0.2)", borderRadius: "8px",
                    padding: "12px 14px", color: "#f0d898",
                    fontFamily: "Georgia, serif", fontSize: "14px",
                    transition: "all 0.2s",
                  }}
                />
                <button
                  aria-label={isFavorite(topic) ? "Quitar de favoritos" : "Agregar a favoritos"}
                  onClick={() => topic && (isFavorite(topic) ? removeFavorite(favorites.find(f => f.topic === topic)?.id) : addFavorite(topic, content))}
                  title={isFavorite(topic) ? "Quitar de favoritos" : "Agregar a favoritos"}
                  style={{
                    background: isFavorite(topic) ? "rgba(52,211,153,0.12)" : "rgba(0,0,0,0.35)",
                    border: `1px solid ${isFavorite(topic) ? "rgba(52,211,153,0.3)" : "rgba(180,150,80,0.2)"}`,
                    borderRadius: "8px", padding: "0",
                    color: isFavorite(topic) ? "#34d399" : "#5a4a2a",
                    fontSize: "18px", cursor: "pointer",
                    minWidth: "44px", minHeight: "44px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.2s",
                  }}
                >
                  {isFavorite(topic) ? "★" : "☆"}
                </button>
              </div>

              <button
                aria-expanded={showContent}
                aria-controls="content-input-area"
                onClick={() => setShowContent(!showContent)}
                style={{
                  background: "rgba(180,130,40,0.08)", 
                  border: "1px solid rgba(180,150,80,0.1)",
                  borderRadius: "8px",
                  cursor: "pointer",
                  color: showContent ? "#c4a84a" : "#7a6a4a",
                  fontFamily: "'DM Mono', monospace", fontSize: "11px",
                  letterSpacing: "0.12em", padding: "12px 16px",
                  display: "flex", alignItems: "center", gap: "10px",
                  width: "100%",
                  minHeight: "44px",
                  marginBottom: showContent ? "12px" : "0",
                  transition: "all 0.2s",
                }}
              >
                <span style={{ 
                  transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)", 
                  transform: showContent ? "rotate(90deg)" : "none", 
                  display: "inline-block" 
                }}>▶</span>
                {showContent ? "OCULTAR" : "PEGAR"} CONTENIDO / APUNTES (opcional pero mejora el resultado)
              </button>

              {showContent && (
                <textarea
                  id="content-input-area"
                  aria-label="Contenido o apuntes adicionales"
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="Pega aquí tu texto crudo, capítulo del libro, tus apuntes, lo que sea..."
                  rows={6}
                  style={{
                    width: "100%", background: "rgba(0,0,0,0.4)",
                    border: "1px solid rgba(180,150,80,0.2)", borderRadius: "8px",
                    padding: "14px", color: "#c4b878",
                    fontFamily: "'DM Mono', monospace", fontSize: "12px",
                    lineHeight: "1.7", resize: "vertical",
                    animation: "fadeIn 0.3s ease-out",
                  }}
                />
              )}
            </div>
          </div>

          <div style={{ padding: "8px 20px 0", maxWidth: "600px", margin: "0 auto" }}>
            <div role="tablist" style={{ display: "flex", gap: "8px" }}>
              {LEVEL_GROUPS.map((g, i) => (
                <button
                  key={i}
                  aria-selected={activeGroup === i}
                  role="tab"
                  onClick={() => setActiveGroup(i)}
                  style={{
                    flex: 1, padding: "12px 8px",
                    background: activeGroup === i ? "rgba(25,22,15,0.98)" : "rgba(18,16,10,0.45)",
                    border: `1px solid ${activeGroup === i ? g.color + "66" : "rgba(180,150,80,0.12)"}`,
                    borderBottom: activeGroup === i ? `3px solid ${g.color}` : "1px solid rgba(180,150,80,0.12)",
                    borderRadius: "10px 10px 0 0",
                    cursor: "pointer",
                    fontFamily: "'DM Mono', monospace", fontSize: "10px",
                    color: activeGroup === i ? g.color : "#6a5a3a",
                    letterSpacing: "0.08em", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", 
                    textAlign: "center",
                    minHeight: "44px",
                  }}
                >{g.label}</button>
              ))}
            </div>
          </div>

          <div style={{
            padding: "0 20px 40px", maxWidth: "600px", margin: "0 auto",
            background: "rgba(18,16,10,0.65)",
            backdropFilter: "blur(12px)",
            borderRadius: "0 0 16px 16px",
            border: "1px solid rgba(180,150,80,0.12)", borderTop: "none",
          }}>
            <div style={{ padding: "16px 0 12px" }}>
              <div style={{
                fontFamily: "'DM Mono', monospace", fontSize: "10px",
                color: group.color + "aa", letterSpacing: "0.18em", marginBottom: "16px",
                borderLeft: `2px solid ${group.color}`, paddingLeft: "12px",
              }}>
                {group.label.toUpperCase()} — {groupActions.length} HERRAMIENTAS
              </div>
              {groupActions.map(a => (
                <ActionCard 
                  key={a.id} 
                  action={a} 
                  topic={topic} 
                  content={content} 
                  apiKey={apiKey}
                  onGenerate={handleGenerate}
                  onHistoryAdd={addEntry}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <PromptLibrary />
      )}

      {/* Footer */}
      <footer style={{
        maxWidth: "600px", margin: "16px auto 40px",
        padding: "0 20px",
        fontFamily: "'DM Mono', monospace", fontSize: "10px",
        color: "#5a4a2a", textAlign: "center", letterSpacing: "0.06em",
        lineHeight: "1.8"
      }}>
        <div style={{ opacity: 0.8 }}>Gemini 2.5 Flash · 250 requests/día gratis · sin tarjeta</div>
        <div style={{ marginTop: "10px", color: "#6a5a3a" }}>
          Ctrl+K API · Ctrl+Shift+C Contenido · Ctrl+Enter Generar · Ctrl+←→ Pestañas
        </div>
      </footer>

      <HistoryPanel history={history} onClear={clearHistory} />
      <FavoritesPanel favorites={favorites} onRemove={removeFavorite} onRestore={(f) => { setTopic(f.topic); setContent(f.content || ""); }} />
      <ToastContainer toasts={toasts} />
    </main>
  );
}