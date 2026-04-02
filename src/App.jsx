import React, { useState, useRef, useEffect } from "react";
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

// Win2K color palette
const W = {
  face:    "#d4d0c8",
  shadow:  "#808080",
  dkShadow:"#404040",
  hilight: "#ffffff",
  btnHi:   "#ece9d8",
  btnText: "#000000",
  blue:    "#000080",
  selBlue: "#0a246a",
  selText: "#ffffff",
  inset:   "#ffffff",
  border:  "#808080",
};

// Reusable Win2K raised box
const raised = {
  background: W.face,
  border: `2px solid`,
  borderColor: `${W.hilight} ${W.dkShadow} ${W.dkShadow} ${W.hilight}`,
  outline: `1px solid ${W.shadow}`,
  outlineOffset: "-2px",
};

const sunken = {
  background: W.inset,
  border: `2px solid`,
  borderColor: `${W.dkShadow} ${W.hilight} ${W.hilight} ${W.dkShadow}`,
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
};

export default function App() {
  const [apiKey, setApiKey] = useLocalStorage("iceberg-apiKey", "");
  const [showKey, setShowKey] = useState(false);
  const [topic, setTopic] = useLocalStorage("iceberg-topic", "");
  const [content, setContent] = useLocalStorage("iceberg-content", "");
  const [showContent, setShowContent] = useState(false);
  const [activeGroup, setActiveGroup] = useState(0);
  const [view, setView] = useState("app");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

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
      background: W.face,
      fontFamily: "Tahoma, 'MS Sans Serif', Arial, sans-serif",
      fontSize: "11px",
      color: W.btnText,
      opacity: mounted ? 1 : 0,
      transition: "opacity 0.3s",
    }}>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; background: #3a6ea5 !important; }
        input, textarea, select {
          font-family: Tahoma, 'MS Sans Serif', Arial, sans-serif;
          font-size: 11px;
        }
        input:focus, textarea:focus {
          outline: 1px dotted #000 !important;
          outline-offset: -2px !important;
        }
        ::-webkit-scrollbar { width: 16px; height: 16px; }
        ::-webkit-scrollbar-track { background: #d4d0c8; }
        ::-webkit-scrollbar-thumb {
          background: #d4d0c8;
          border: 2px solid;
          border-color: #fff #808080 #808080 #fff;
        }
        ::-webkit-scrollbar-button {
          background: #d4d0c8;
          border: 2px solid;
          border-color: #fff #808080 #808080 #fff;
          height: 16px;
          width: 16px;
        }
        .win-tab { 
          background: #d4d0c8; 
          border: 2px solid;
          border-color: #fff #808080 transparent #fff;
          padding: 3px 12px 4px;
          font-family: Tahoma, Arial, sans-serif;
          font-size: 11px;
          cursor: pointer;
          position: relative;
          top: 2px;
          margin-right: 2px;
        }
        .win-tab.active {
          background: #d4d0c8;
          border-bottom-color: #d4d0c8;
          font-weight: bold;
          z-index: 1;
        }
        .win-tab:not(.active) {
          background: #bab8b0;
          top: 4px;
        }
        .win-nav-btn {
          background: #d4d0c8;
          border: 2px solid;
          border-color: #fff #808080 #808080 #fff;
          padding: 3px 20px;
          font-family: Tahoma, Arial, sans-serif;
          font-size: 11px;
          cursor: pointer;
          margin-right: 4px;
        }
        .win-nav-btn.active {
          border-color: #808080 #fff #fff #808080;
          background: #bab8b0;
        }
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>

      <Header />

      {/* Desktop "Window" container */}
      <div style={{
        maxWidth: "700px",
        margin: "12px auto",
        padding: "0 8px 20px",
      }}>

        {/* Navigation Buttons (like old-style toolbar) */}
        <div style={{
          ...raised,
          padding: "4px 8px",
          marginBottom: "8px",
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}>
          <span style={{ fontSize: "11px", marginRight: "8px", color: "#444" }}>Ver:</span>
          {[
            { key: 'app', label: 'Instrumental' },
            { key: 'prompts', label: 'Conocimiento' }
          ].map(v => (
            <button
              key={v.key}
              className={`win-nav-btn${view === v.key ? " active" : ""}`}
              onClick={() => setView(v.key)}
            >
              {v.label}
            </button>
          ))}
        </div>

        {view === "app" ? (
          <>
            {/* API Key Panel */}
            <fieldset style={{
              ...raised,
              padding: "8px 12px 12px",
              marginBottom: "8px",
              border: "2px solid",
              borderColor: `${W.hilight} ${W.dkShadow} ${W.dkShadow} ${W.hilight}`,
              background: W.face,
            }}>
              <legend style={{
                fontFamily: "Tahoma, Arial, sans-serif",
                fontSize: "11px",
                fontWeight: "bold",
                padding: "0 4px",
                background: W.face,
              }}>Configuración de API</legend>

              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <label htmlFor="apiKey" style={{ whiteSpace: "nowrap", fontSize: "11px" }}>
                  API Key de Gemini:
                </label>
                <div style={{ flex: 1, position: "relative" }}>
                  <input
                    id="apiKey"
                    type={showKey ? "text" : "password"}
                    value={apiKey}
                    onChange={e => setApiKey(e.target.value)}
                    placeholder="Ingresa tu Gemini API Key..."
                    style={{
                      ...sunken,
                      width: "100%",
                      padding: "2px 28px 2px 4px",
                      fontSize: "11px",
                      background: "#fff",
                      color: "#000",
                    }}
                  />
                  <button
                    onClick={() => setShowKey(!showKey)}
                    title={showKey ? "Ocultar" : "Mostrar"}
                    style={{
                      position: "absolute", right: "2px", top: "50%", transform: "translateY(-50%)",
                      ...winBtn,
                      padding: "1px 6px",
                      fontSize: "10px",
                      minHeight: "18px",
                      border: "1px solid #808080",
                    }}
                  >{showKey ? "◈" : "◇"}</button>
                </div>
              </div>
            </fieldset>

            {/* Topic & Content Panel */}
            <fieldset style={{
              ...raised,
              padding: "8px 12px 12px",
              marginBottom: "8px",
              border: "2px solid",
              borderColor: `${W.hilight} ${W.dkShadow} ${W.dkShadow} ${W.hilight}`,
              background: W.face,
            }}>
              <legend style={{
                fontFamily: "Tahoma, Arial, sans-serif",
                fontSize: "11px",
                fontWeight: "bold",
                padding: "0 4px",
                background: W.face,
              }}>Tema de Investigación</legend>

              <div style={{ marginBottom: "8px" }}>
                <label htmlFor="topic" style={{ display: "block", marginBottom: "3px", fontSize: "11px" }}>
                  Tema:
                </label>
                <div style={{ display: "flex", gap: "4px" }}>
                  <input
                    id="topic"
                    value={topic}
                    onChange={e => setTopic(e.target.value)}
                    placeholder="ej: Mecánica Cuántica..."
                    style={{
                      ...sunken,
                      flex: 1,
                      padding: "2px 4px",
                      fontSize: "11px",
                      background: "#fff",
                      color: "#000",
                    }}
                  />
                  <button
                    onClick={() => topic && (isFavorite(topic) ? removeFavorite(favorites.find(f => f.topic === topic)?.id) : addFavorite(topic, content))}
                    title={isFavorite(topic) ? "Quitar de favoritos" : "Añadir a favoritos"}
                    style={{
                      ...winBtn,
                      background: isFavorite(topic) ? "#ffffc0" : W.face,
                      padding: "2px 10px",
                    }}
                  >
                    {isFavorite(topic) ? "★" : "☆"}
                  </button>
                </div>
              </div>

              <button
                onClick={() => setShowContent(!showContent)}
                style={{
                  ...winBtn,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: showContent ? "6px" : "0",
                }}
              >
                <span style={{
                  display: "inline-block",
                  width: "9px", height: "9px",
                  border: "1px solid #808080",
                  background: "#fff",
                  textAlign: "center",
                  lineHeight: "7px",
                  fontSize: "9px",
                  flexShrink: 0,
                }}>
                  {showContent ? "−" : "+"}
                </span>
                {showContent ? "Ocultar Fuentes de Datos" : "Expandir Fuentes de Datos (Opcional)"}
              </button>

              {showContent && (
                <div>
                  <label htmlFor="content" style={{ display: "block", marginBottom: "3px", fontSize: "11px" }}>
                    Contenido / Apuntes:
                  </label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="Vuelca tus apuntes, transcripciones o fragmentos de lectura aquí..."
                    rows={8}
                    style={{
                      ...sunken,
                      width: "100%",
                      padding: "4px",
                      fontSize: "11px",
                      background: "#fff",
                      color: "#000",
                      resize: "vertical",
                      lineHeight: "1.5",
                    }}
                  />
                </div>
              )}
            </fieldset>

            {/* Tab Panel for Actions */}
            <div>
              {/* Tab Buttons */}
              <div role="tablist" style={{ display: "flex", borderBottom: "none", paddingLeft: "4px" }}>
                {LEVEL_GROUPS.map((g, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={activeGroup === i}
                    onClick={() => setActiveGroup(i)}
                    className={`win-tab${activeGroup === i ? " active" : ""}`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>

              {/* Tab Content Panel */}
              <div style={{
                ...raised,
                border: "2px solid",
                borderColor: `${W.hilight} ${W.dkShadow} ${W.dkShadow} ${W.hilight}`,
                padding: "10px",
                background: W.face,
                marginBottom: "8px",
              }}>
                <div style={{
                  marginBottom: "8px",
                  padding: "2px 6px",
                  background: W.selBlue,
                  color: W.selText,
                  fontSize: "11px",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}>
                  <span style={{ fontSize: "9px" }}>▶</span>
                  PROTOCOLOS DISPONIBLES: {groupActions.length}
                </div>

                {groupActions.map((a) => (
                  <ActionCard
                    key={a.id} action={a} topic={topic} content={content} apiKey={apiKey}
                    onGenerate={handleGenerate} onHistoryAdd={addEntry}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <PromptLibrary />
        )}

        {/* Status Bar */}
        <div style={{
          ...raised,
          borderTop: `2px solid ${W.dkShadow}`,
          padding: "2px 8px",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "11px",
          color: "#444",
        }}>
          <span>Listo</span>
          <span>Gemini 1.5 Flash · Iceberg Prompts v3.2</span>
        </div>
      </div>

      <HistoryPanel history={history} onClear={clearHistory} />
      <FavoritesPanel favorites={favorites} onRemove={removeFavorite} onRestore={(f) => { setTopic(f.topic); setContent(f.content || ""); }} />
      <ToastContainer toasts={toasts} />
    </main>
  );
}
