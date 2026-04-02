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

  const obsidianBG = "#050505";
  const goldAccent = "#d4af37";
  const softGold = "rgba(212, 175, 55, 0.45)";

  return (
    <main role="main" style={{
      minHeight: "100vh",
      background: obsidianBG,
      backgroundAttachment: "fixed",
      backgroundImage: `
        radial-gradient(circle at 50% -10%, rgba(212,175,55,0.08) 0%, transparent 70%),
        radial-gradient(circle at 0% 100%, rgba(212,175,55,0.03) 0%, transparent 40%),
        url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E")
      `,
      color: "#f0e6d2",
      fontFamily: "'Inter', sans-serif",
      overflowX: "hidden",
      opacity: mounted ? 1 : 0,
      transition: "opacity 1s ease-in-out"
    }}>
      <style>{`
        @keyframes reveal { from { opacity: 0; transform: translateY(20px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        .stagger-1 { animation: reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .stagger-2 { animation: reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards; opacity: 0; }
        .stagger-3 { animation: reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards; opacity: 0; }
        input, textarea { border-color: rgba(212,175,55,0.15) !important; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important; }
        input:focus, textarea:focus { border-color: ${goldAccent}88 !important; box-shadow: 0 0 15px ${goldAccent}22 !important; background: rgba(0,0,0,0.6) !important; }
        .glass-panel { background: rgba(15,15,15,0.7); backdrop-filter: blur(15px); border: 1px solid rgba(212,175,55,0.12); box-shadow: 0 10px 40px rgba(0,0,0,0.5); }
      `}</style>

      <div className="stagger-1">
        <Header />
      </div>

      <nav className="stagger-2" style={{ display: "flex", justifyContent: "center", gap: "30px", marginBottom: "30px" }}>
        {['app', 'prompts'].map(v => (
          <button
            key={v}
            onClick={() => setView(v)}
            style={{
              background: "none", border: "none",
              color: view === v ? goldAccent : "#5a4a3a",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px", fontWeight: "bold", letterSpacing: "0.25em",
              cursor: "pointer", padding: "10px 0",
              borderBottom: `2px solid ${view === v ? goldAccent : "transparent"}`,
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              textTransform: "uppercase"
            }}
          >
            {v === 'app' ? "Instrumental" : "Conocimiento"}
          </button>
        ))}
      </nav>

      {view === "app" ? (
        <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 20px" }}>
          
          {/* Key Area */}
          <section className="glass-panel stagger-3" style={{ padding: "24px", borderRadius: "20px", marginBottom: "20px" }}>
             <h4 style={{ 
               fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: goldAccent, 
               margin: "0 0 16px", textTransform: "uppercase", letterSpacing: "0.2em", opacity: 0.7 
             }}>Secret Key Entry</h4>
             
             <div style={{ position: "relative" }}>
               <input
                 type={showKey ? "text" : "password"}
                 value={apiKey}
                 onChange={e => setApiKey(e.target.value)}
                 placeholder="Enter Gemini API Key..."
                 style={{
                   width: "100%", background: "rgba(0,0,0,0.4)", padding: "16px 50px 16px 18px",
                   borderRadius: "12px", border: "1px solid", color: goldAccent,
                   fontFamily: "'JetBrains Mono', monospace", fontSize: "13px"
                 }}
               />
               <button
                 onClick={() => setShowKey(!showKey)}
                 style={{
                   position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)",
                   background: "none", border: "none", cursor: "pointer", fontSize: "18px", opacity: 0.6
                 }}
               >{showKey ? "◈" : "◇"}</button>
             </div>
          </section>

          {/* Form Area */}
          <section className="glass-panel stagger-3" style={{ 
            padding: "24px", borderRadius: "20px", marginBottom: "30px",
            border: `1px solid ${topic ? goldAccent + '33' : 'rgba(212,175,55,0.12)'}`
          }}>
             <div style={{ marginBottom: "20px" }}>
               <label style={{ 
                 fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "#5a4a3a", 
                 display: "block", marginBottom: "10px", letterSpacing: "0.15em" 
               }}>TEMA DE INVESTIGACIÓN</label>
               <div style={{ display: "flex", gap: "12px" }}>
                 <input
                   value={topic}
                   onChange={e => setTopic(e.target.value)}
                   placeholder="ej: Mecánica Cuántica..."
                   style={{
                     flex: 1, background: "rgba(0,0,0,0.3)", padding: "16px 20px",
                     borderRadius: "12px", border: "1px solid", color: "#f0e6d2",
                     fontFamily: "'Playfair Display', serif", fontSize: "18px", fontStyle: "italic"
                   }}
                 />
                 <button
                   onClick={() => topic && (isFavorite(topic) ? removeFavorite(favorites.find(f => f.topic === topic)?.id) : addFavorite(topic, content))}
                   style={{
                     background: isFavorite(topic) ? goldAccent : "rgba(255,255,255,0.03)",
                     borderRadius: "12px", width: "56px", border: `1px solid ${goldAccent}33`,
                     color: isFavorite(topic) ? "#000" : goldAccent, cursor: "pointer",
                     fontSize: "20px", transition: "all 0.3s"
                   }}
                 >
                   {isFavorite(topic) ? "★" : "☆"}
                 </button>
               </div>
             </div>

             <button
               onClick={() => setShowContent(!showContent)}
               style={{
                 width: "100%", background: "none", border: `1px dashed ${goldAccent}33`,
                 padding: "16px", borderRadius: "12px", color: "#8a7a6a",
                 fontFamily: "'JetBrains Mono', monospace", fontSize: "10px",
                 cursor: "pointer", display: "flex", alignItems: "center", gap: "12px",
                 transition: "all 0.3s"
               }}
               onMouseOver={e => e.currentTarget.style.borderColor = goldAccent}
               onMouseOut={e => e.currentTarget.style.borderColor = goldAccent + '33'}
             >
               <span style={{ transform: showContent ? "rotate(90deg)" : "none", transition: "0.3s" }}>▶</span>
               {showContent ? "RESUMIR ÁREA DE TRABAJO" : "EXPANDIR FUENTES DE DATOS (OPCIONAL)"}
             </button>

             {showContent && (
               <textarea
                 value={content}
                 onChange={e => setContent(e.target.value)}
                 placeholder="Vuelca tus apuntes, transcripciones o fragmentos de lectura aquí..."
                 rows={10}
                 style={{
                   width: "100%", background: "rgba(0,0,0,0.35)", padding: "20px",
                   borderRadius: "12px", border: "1px solid", color: "#a89a7a",
                   marginTop: "16px", fontFamily: "'Inter', sans-serif", fontSize: "13px",
                   lineHeight: "1.8", animation: "reveal 0.4s ease-out"
                 }}
               />
             )}
          </section>

          {/* Nav Tabs */}
          <div role="tablist" style={{ display: "flex", gap: "10px", padding: "0 10px" }}>
            {LEVEL_GROUPS.map((g, i) => (
              <button
                key={i}
                aria-selected={activeGroup === i}
                onClick={() => setActiveGroup(i)}
                style={{
                  flex: 1, padding: "16px 8px", background: activeGroup === i ? "rgba(212,175,55,0.06)" : "transparent",
                  border: "none", borderBottom: `3px solid ${activeGroup === i ? goldAccent : "transparent"}`,
                  color: activeGroup === i ? "#f0e6d2" : "#5a4a3a", cursor: "pointer",
                  fontFamily: "'JetBrains Mono', monospace", fontSize: "9px",
                  letterSpacing: "0.15em", transition: "0.4s"
                }}
              >
                {g.label.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Action List */}
          <div style={{ 
            background: "rgba(10,10,10,0.4)", border: "1px solid rgba(212,175,55,0.08)",
            borderRadius: "0 0 24px 24px", padding: "24px 20px 40px", marginBottom: "40px"
          }}>
            <h5 style={{ 
               fontFamily: "'JetBrains Mono', monospace", fontSize: "8px", color: goldAccent,
               opacity: 0.5, letterSpacing: "0.3em", marginBottom: "24px"
            }}>PROTOCOLOS DISPONIBLES : {groupActions.length}</h5>
            
            {groupActions.map((a, i) => (
              <ActionCard 
                key={a.id} action={a} topic={topic} content={content} apiKey={apiKey}
                onGenerate={handleGenerate} onHistoryAdd={addEntry} 
              />
            ))}
          </div>
        </div>
      ) : (
        <PromptLibrary />
      )}

      {/* Footer Details */}
      <footer style={{
        maxWidth: "680px", margin: "40px auto", textAlign: "center",
        paddingBottom: "60px", opacity: 0.4
      }}>
         <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.1em" }}>
           ESTÉTICA OBSIDIAN & GOLD · 100/100 LIGHTHOUSE · MAESTRÍA IA
         </p>
      </footer>

      <HistoryPanel history={history} onClear={clearHistory} />
      <FavoritesPanel favorites={favorites} onRemove={removeFavorite} onRestore={(f) => { setTopic(f.topic); setContent(f.content || ""); }} />
      <ToastContainer toasts={toasts} />
    </main>
  );
}