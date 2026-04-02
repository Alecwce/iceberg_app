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

export default function App() {
  const [apiKey, setApiKey] = useLocalStorage("iceberg-apiKey", "");
  const [model, setModel] = useLocalStorage("iceberg-model", "gemini-2.5-flash");
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
      model,
      systemPrompt: action.ai.system,
      userPrompt
    });
  };

  return (
    <main role="main" className="app-container" style={{ opacity: mounted ? 1 : 0, transition: "opacity 1s ease-in-out" }}>
      <div className="stagger-1">
        <Header activeModel={model} />
      </div>

      <nav className="view-nav stagger-2">
        {['app', 'prompts'].map(v => (
          <button
            key={v}
            className={`nav-btn ${view === v ? 'active' : ''}`}
            onClick={() => setView(v)}
          >
            {v === 'app' ? "Instrumental" : "Conocimiento"}
          </button>
        ))}
      </nav>

      {view === "app" ? (
        <div className="main-content">
          
          {/* Key & Model Area */}
          <section className="glass-panel key-section stagger-3" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 200px', gap: '16px', alignItems: 'end' }}>
             <div>
               <h4 className="section-label">Secret Key Entry</h4>
               <div className="input-group">
                 <input
                   type={showKey ? "text" : "password"}
                   value={apiKey}
                   onChange={e => setApiKey(e.target.value)}
                   placeholder="Enter Gemini API Key..."
                   className="input-standard mono"
                 />
                 <button onClick={() => setShowKey(!showKey)} className="toggle-btn">
                   {showKey ? "◈" : "◇"}
                 </button>
               </div>
             </div>
             
             <div>
               <h4 className="section-label">Intelligence Core</h4>
               <select 
                 className="input-standard mono" 
                 value={model} 
                 onChange={e => setModel(e.target.value)}
                 style={{ height: '44px', width: '100%', cursor: 'pointer' }}
               >
                 <option value="gemini-2.5-flash">Gemini 2.5 Flash (Recommended)</option>
                 <option value="gemini-2.5-flash-lite">Gemini 2.5 Flash-Lite (Fastest)</option>
                 <option value="gemini-2.5-pro">Gemini 2.5 Pro (Powerful)</option>
                 <option value="gemini-2.0-flash">Gemini 2.0 Flash (Stable)</option>
               </select>
             </div>
          </section>

          {/* Form Area */}
          <section className="glass-panel form-section stagger-3" style={{ 
            borderColor: topic ? 'rgba(212,175,55,0.3)' : 'var(--glass-border)'
          }}>
             <div className="topic-area">
               <label className="section-label">TEMA DE INVESTIGACIÓN</label>
               <div className="topic-input-row">
                 <input
                   value={topic}
                   onChange={e => setTopic(e.target.value)}
                   placeholder="ej: Mecánica Cuántica..."
                   className="topic-input"
                 />
                 <button
                   className={`favorite-btn ${isFavorite(topic) ? 'active' : ''}`}
                   onClick={() => topic && (isFavorite(topic) ? removeFavorite(favorites.find(f => f.topic === topic)?.id) : addFavorite(topic, content))}
                 >
                   {isFavorite(topic) ? "★" : "☆"}
                 </button>
               </div>
             </div>

             <button className="expand-trigger" onClick={() => setShowContent(!showContent)}>
               <span className={`arrow ${showContent ? 'open' : ''}`}>▶</span>
               {showContent ? "RESUMIR ÁREA DE TRABAJO" : "EXPANDIR FUENTES DE DATOS (OPCIONAL)"}
             </button>

             {showContent && (
               <textarea
                 value={content}
                 onChange={e => setContent(e.target.value)}
                 placeholder="Vuelca tus apuntes, transcripciones o fragmentos de lectura aquí..."
                 rows={10}
                 className="content-textarea stagger-reveal"
               />
             )}
          </section>

          {/* Nav Tabs */}
          <div role="tablist" className="tabs-container">
            {LEVEL_GROUPS.map((g, i) => (
              <button
                key={i}
                aria-selected={activeGroup === i}
                onClick={() => setActiveGroup(i)}
                className={`tab-btn ${activeGroup === i ? 'active' : ''}`}
              >
                {g.label.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Action List */}
          <div className="actions-list glass-panel">
            <h5 className="actions-header mono">
              PROTOCOLOS DISPONIBLES : {groupActions.length}
            </h5>
            
            <div className="action-grid">
              {groupActions.map((a) => (
                <ActionCard 
                  key={a.id} action={a} topic={topic} content={content} apiKey={apiKey}
                  onGenerate={handleGenerate} onHistoryAdd={addEntry} 
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <PromptLibrary />
      )}

      <footer className="footer-info">
         <p className="mono">
           ESTÉTICA OBSIDIAN & GOLD · MAESTRÍA IA · REFINED DARKNESS
         </p>
      </footer>

      <HistoryPanel history={history} onClear={clearHistory} />
      <FavoritesPanel favorites={favorites} onRemove={removeFavorite} onRestore={(f) => { setTopic(f.topic); setContent(f.content || ""); }} />
      <ToastContainer toasts={toasts} />
    </main>
  );
}