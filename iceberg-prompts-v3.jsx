import { useState } from "react";

const GEMINI_MODEL = "gemini-2.5-flash-preview-04-17";

const ACTIONS = [
  {
    id: "outline",
    step: "01",
    level: 1,
    levelTag: "ESTUDIAR",
    levelColor: "#f59e0b",
    title: "Outline Jerárquico",
    desc: "Estructura el tema con tus palabras",
    when: "Al estudiar por primera vez",
    icon: "◈",
    systemPrompt: `Eres un tutor experto en aprendizaje profundo. Tu tarea es crear un outline jerárquico de estudio.
REGLAS ESTRICTAS:
- NUNCA copies textual, siempre parafrasea
- Máximo 15 palabras por ítem
- Usa este formato exacto con emojis:
  ## Capítulo Principal
  ### Sección importante
  - Ítem concreto explicado simple
  - 💡 Ejemplo: [ejemplo cotidiano breve]
  - ❓ [si algo es confuso, marca para investigar]
- Al final, una sección "🎯 IDEAS CLAVE (3 bullets máximo)"`,
    buildPrompt: (tema, contenido) =>
      contenido
        ? `Crea un outline jerárquico de estudio para el tema: "${tema}"\n\nContenido a procesar:\n${contenido}`
        : `Crea un outline jerárquico de estudio completo para aprender: "${tema}". Incluye los conceptos esenciales que cualquier estudiante debe dominar.`,
  },
  {
    id: "feynman",
    step: "02",
    level: 1,
    levelTag: "ESTUDIAR",
    levelColor: "#f59e0b",
    title: "Feynman + Boludo de al lado",
    desc: "Explica simple y anticipa confusiones",
    when: "Para cada concepto clave",
    icon: "◉",
    systemPrompt: `Eres un tutor que aplica la Técnica Feynman. Para cada concepto importante del tema:
FORMATO OBLIGATORIO:
---
**CONCEPTO: [nombre]**
1. 🧒 EXPLICACIÓN SIMPLE (como a un chico de 12 años, cero jerga):
   [explicación en 2-3 oraciones máximo]

2. 🔄 ANALOGÍA COTIDIANA:
   "Es como cuando..." [comparación de la vida real]

3. 😅 PREGUNTAS DEL BOLUDO (compañero distraído):
   - "¿No es lo mismo que...?" → [respuesta clara]
   - "¿Para qué sirve esto?" → [respuesta práctica]
   - 🪤 PREGUNTA TRAMPA: [pregunta que parece fácil pero requiere entender bien]
---
Identifica los 3-4 conceptos más importantes del tema.`,
    buildPrompt: (tema, contenido) =>
      contenido
        ? `Aplica Feynman + Boludo de al lado para el tema "${tema}".\n\nContenido:\n${contenido}`
        : `Aplica Feynman + Boludo de al lado para enseñar "${tema}". Identifica y explica los 3-4 conceptos más importantes de este tema.`,
  },
  {
    id: "cornell",
    step: "03",
    level: 2,
    levelTag: "REPASAR",
    levelColor: "#34d399",
    title: "Cornell — Columna Q",
    desc: "Preguntas y síntesis para Active Recall",
    when: "Al terminar de estudiar",
    icon: "⬡",
    systemPrompt: `Eres experto en el Método Cornell para toma de apuntes. Genera el layout completo.
FORMATO EXACTO:
━━━━━━━━━━━━━━━━━━━━━━━━
📋 METADATA
Tema: [tema] | Cuándo estudiar: [sugerencia]
¿Por qué importa?: [1 oración de motivación]
━━━━━━━━━━━━━━━━━━━━━━━━
🔑 COLUMNA Q — (tapar las notas y responder estas)

PREGUNTAS TIPO EXAMEN:
[8 preguntas variadas: 2 definición, 2 causa-efecto, 2 aplicación, 2 comparación]

PALABRAS CLAVE:
[6 términos] → _______________

━━━━━━━━━━━━━━━━━━━━━━━━
📝 SÍNTESIS (máximo 3 líneas)
[idea principal en palabras propias]
━━━━━━━━━━━━━━━━━━━━━━━━`,
    buildPrompt: (tema, contenido) =>
      contenido
        ? `Genera el layout Cornell completo para "${tema}".\n\nApuntes base:\n${contenido}`
        : `Genera el layout Cornell completo para estudiar "${tema}". Basa las preguntas en los conceptos esenciales de este tema.`,
  },
  {
    id: "quiz",
    step: "04",
    level: 2,
    levelTag: "REPASAR",
    levelColor: "#34d399",
    title: "Quiz Active Recall",
    desc: "10 preguntas abiertas sin opciones múltiples",
    when: "Al día siguiente (Repaso 1)",
    icon: "◫",
    systemPrompt: `Eres un evaluador que aplica Active Recall puro. NUNCA uses opciones múltiples.
FORMATO:
## 🧪 QUIZ — [tema] 

**Bloque 1 — Comprensión (preguntas 1-4)**
❓ [número]. [pregunta abierta de definición/comprensión]
→ _________________________________

**Bloque 2 — Aplicación (preguntas 5-7)**
❓ [número]. ¿Cómo usarías [concepto] para [situación real]?
→ _________________________________

**Bloque 3 — Conexión y trampa (preguntas 8-10)**
❓ [número]. [pregunta que conecta conceptos o parece fácil pero requiere entender bien]
→ _________________________________

---
## ✅ RESPUESTAS (leer después de responder)
[número]. [respuesta concisa, máximo 2 líneas]`,
    buildPrompt: (tema, contenido) =>
      contenido
        ? `Crea un quiz de Active Recall de 10 preguntas para "${tema}".\n\nBase:\n${contenido}`
        : `Crea un quiz de Active Recall de 10 preguntas para evaluar el aprendizaje de "${tema}". Las preguntas deben cubrir los aspectos fundamentales de este tema.`,
  },
  {
    id: "flashcards",
    step: "05",
    level: 2,
    levelTag: "REPASAR",
    levelColor: "#34d399",
    title: "Flashcards Anki-Style",
    desc: "15 tarjetas listas para memorizar",
    when: "Repasos del día 3 y 5",
    icon: "▣",
    systemPrompt: `Eres un experto en memoria y repetición espaciada. Genera 15 flashcards.
DISTRIBUCIÓN OBLIGATORIA:
- 5 de definición ("¿Qué es X?")
- 4 de causa-efecto ("¿Qué causa/produce X?")
- 3 de comparación ("¿Diferencia entre X e Y?")
- 3 de aplicación ("¿Cuándo/cómo usarías X?")

FORMATO por flashcard:
---
🃏 #[número] · [TIPO] · [⭐/⭐⭐/⭐⭐⭐]
**FRENTE:** [pregunta máx. 10 palabras]
**DORSO:** [respuesta máx. 2 líneas]`,
    buildPrompt: (tema, contenido) =>
      contenido
        ? `Genera 15 flashcards Anki-style para "${tema}".\n\nContenido base:\n${contenido}`
        : `Genera 15 flashcards Anki-style para memorizar los conceptos clave de "${tema}".`,
  },
  {
    id: "plan",
    step: "06",
    level: 3,
    levelTag: "RETENER",
    levelColor: "#f87171",
    title: "Plan 2-3-5-7 días",
    desc: "Calendario de repetición espaciada",
    when: "El mismo día que terminas de estudiar",
    icon: "◎",
    systemPrompt: `Eres un coach de aprendizaje experto en repetición espaciada. Genera un plan personalizado.
FORMATO:
## 📅 PLAN DE REPETICIÓN ESPACIADA
**Tema:** [tema]

━━━━━━━━━━━━━━━━━━━━━━━
**Repaso 1 → en 2 días** (15 min)
Tarea: Responder columna Q tapando las notas
🚨 Si no puedo responder estas 3 preguntas, repaso HOY:
• [pregunta clave 1]
• [pregunta clave 2]
• [pregunta clave 3]

**Repaso 2 → en 5 días** (10 min)
Tarea: Quiz de 5 preguntas abiertas de memoria
Señal de alarma: [concepto específico que indica olvido]

**Repaso 3 → en 10 días** (15 min)
Tarea: Flashcards + 1 caso de aplicación real
Meta: Explicárselo a alguien en 2 minutos

**Repaso 4 → en 17 días** (20 min)
Tarea: Test de retención final + conectar con otros temas
━━━━━━━━━━━━━━━━━━━━━━━
⚠️ Regla: Si fallo 3+ flashcards → reinicio el ciclo`,
    buildPrompt: (tema, contenido) =>
      contenido
        ? `Crea el plan de repetición espaciada 2-3-5-7 para "${tema}".\n\nConceptos a retener:\n${contenido}`
        : `Crea el plan de repetición espaciada 2-3-5-7 para retener "${tema}". Genera preguntas de alarma específicas para los conceptos esenciales de este tema.`,
  },
  {
    id: "retention",
    step: "07",
    level: 3,
    levelTag: "RETENER",
    levelColor: "#f87171",
    title: "Test de Retención Final",
    desc: "Evalúa si realmente dominaste el tema",
    when: "Después del último repaso (día 17)",
    icon: "◐",
    systemPrompt: `Eres un evaluador experto en retención a largo plazo. Genera un test completo de 3 bloques.
FORMATO:
## 🎓 TEST DE RETENCIÓN FINAL — [tema]

### 🧪 Bloque 1 — Recall puro (sin mirar nada, 5 min)
[5 preguntas de los conceptos MÁS importantes]
Cada una con espacio: → _______________________

### 🧠 Bloque 2 — Aplicación real (7 min)  
[3 mini-situaciones donde aplicar lo aprendido]
Ej: "Imagina que tienes que explicarle esto a un colega..."

### 🔗 Bloque 3 — Conexiones (3 min)
[2 preguntas que conecten este tema con conocimientos previos típicos]

---
## ✅ RESPUESTAS MODELO
[respuestas detalladas para cada pregunta]

---
## 📊 RÚBRICA
- 13-15 ✅ → Tema dominado. Pasar al siguiente.
- 9-12 ⚠️ → Repasar secciones específicas: [indica cuáles]
- <9 🔄 → Reiniciar ciclo 2-3-5-7`,
    buildPrompt: (tema, contenido) =>
      contenido
        ? `Genera el test de retención final para "${tema}".\n\nApuntes originales:\n${contenido}`
        : `Genera el test de retención final completo para evaluar el dominio de "${tema}".`,
  },
];

const LEVEL_GROUPS = [
  { label: "① Estudiar", tag: "ESTUDIAR", color: "#f59e0b", ids: ["outline", "feynman"] },
  { label: "② Repasar", tag: "REPASAR", color: "#34d399", ids: ["cornell", "quiz", "flashcards"] },
  { label: "③ Retener", tag: "RETENER", color: "#f87171", ids: ["plan", "retention"] },
];

function Spinner({ color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "20px 0" }}>
      <div style={{
        width: "16px", height: "16px",
        border: `2px solid ${color}33`,
        borderTop: `2px solid ${color}`,
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }} />
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#7a6a4a" }}>
        generando con Gemini...
      </span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function ResultBlock({ text, color }) {
  const [copied, setCopied] = useState(false);
  return (
    <div style={{ marginTop: "12px", animation: "fadeIn 0.4s ease-out" }}>
      <div style={{
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(8px)",
        border: `1px solid ${color}33`,
        borderRadius: "12px",
        padding: "20px",
        fontFamily: "Georgia, serif",
        fontSize: "13px",
        color: "#dcd2b0",
        lineHeight: "1.95",
        whiteSpace: "pre-wrap",
        maxHeight: "450px",
        overflowY: "auto",
        boxShadow: "inset 0 0 20px rgba(0,0,0,0.3)",
      }}>
        {text}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
        <button
          aria-label="Copiar resultado al portapapeles"
          onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          style={{
            background: copied ? "rgba(52,211,153,0.15)" : "rgba(180,130,40,0.08)",
            border: `1px solid ${copied ? "#34d399" : "rgba(180,150,80,0.25)"}`,
            color: copied ? "#6ee7b7" : "#a89a78",
            padding: "8px 20px",
            borderRadius: "8px",
            fontSize: "11px",
            cursor: "pointer",
            fontFamily: "'DM Mono', monospace",
            letterSpacing: "0.1em",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: copied ? "0 0 10px rgba(52,211,153,0.2)" : "none",
          }}
        >{copied ? "✓ COPIADO" : "COPIAR"}</button>
      </div>
    </div>
  );
}

function ActionCard({ action, tema, contenido, apiKey }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);

  const handleGenerate = async () => {
    if (!apiKey.trim()) { setError("Ingresa tu API key de Gemini primero."); return; }
    if (!tema.trim()) { setError("Ingresa el tema a estudiar."); return; }
    setLoading(true); setError(null); setResult(null);
    try {
      const prompt = action.buildPrompt(tema, contenido);
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: action.systemPrompt }] },
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
          }),
        }
      );
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error?.message || `Error ${res.status}`);
      }
      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error("Respuesta vacía de Gemini.");
      setResult(text);
      setDone(true);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: open ? "rgba(18,16,10,0.95)" : "rgba(18,16,10,0.5)",
      border: `1px solid ${open ? action.levelColor + "44" : "rgba(180,150,80,0.1)"}`,
      borderRadius: "10px",
      overflow: "hidden",
      marginBottom: "8px",
      transition: "all 0.2s",
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", background: "none", border: "none",
          padding: "14px 16px", cursor: "pointer",
          display: "flex", alignItems: "center", gap: "12px", textAlign: "left",
        }}
      >
        <span style={{
          fontFamily: "'DM Mono', monospace", fontSize: "17px",
          color: done ? "#6ee7b7" : action.levelColor,
          minWidth: "20px", textAlign: "center",
        }}>{done ? "✓" : action.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: "'DM Mono', monospace", fontSize: "12px",
            color: done ? "#6ee7b7" : "#e8d5a3", fontWeight: "bold", letterSpacing: "0.03em",
          }}>{action.title}</div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: "11px", color: "#6a5a38", marginTop: "2px" }}>
            {action.when}
          </div>
        </div>
        <span style={{
          color: "#4a3c22", fontSize: "11px",
          transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s",
        }}>▾</span>
      </button>

      {open && (
        <div style={{ padding: "0 16px 18px" }}>
          <p style={{
            fontFamily: "Georgia, serif", fontSize: "12px", color: "#6a5a38",
            margin: "0 0 12px", lineHeight: "1.5",
          }}>{action.desc}</p>

          <button
            onClick={handleGenerate}
            disabled={loading}
            style={{
              width: "100%",
              background: loading
                ? "rgba(180,130,40,0.08)"
                : `linear-gradient(135deg, ${action.levelColor}22, ${action.levelColor}11)`,
              border: `1px solid ${action.levelColor}55`,
              color: loading ? "#7a6a4a" : action.levelColor,
              padding: "11px",
              borderRadius: "8px",
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "'DM Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.1em",
              fontWeight: "bold",
              transition: "all 0.2s",
            }}
          >
            {loading ? "GENERANDO..." : result ? "↺ REGENERAR CON GEMINI" : "⚡ GENERAR CON GEMINI"}
          </button>

          {loading && <Spinner color={action.levelColor} />}
          {error && (
            <div style={{
              marginTop: "10px", padding: "10px 12px",
              background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)",
              borderRadius: "7px", fontFamily: "'DM Mono', monospace",
              fontSize: "11px", color: "#f87171",
            }}>⚠ {error}</div>
          )}
          {result && <ResultBlock text={result} color={action.levelColor} />}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [tema, setTema] = useState("");
  const [contenido, setContenido] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [activeGroup, setActiveGroup] = useState(0);

  const group = LEVEL_GROUPS[activeGroup];
  const groupActions = ACTIONS.filter(a => group.ids.includes(a.id));

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

      {/* Header */}
      <div style={{
        padding: "24px 20px 18px",
        borderBottom: "1px solid rgba(180,150,80,0.1)",
        background: "rgba(0,0,0,0.4)",
      }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div style={{
            fontFamily: "'DM Mono', monospace", fontSize: "9px",
            color: "#5a4a2a", letterSpacing: "0.25em", marginBottom: "6px",
          }}>🧊 ICEBERG DE LOS APUNTES v3 · IA INTEGRADA</div>
          <h1 style={{
            margin: "0 0 3px",
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "22px", color: "#f0d898", fontWeight: "700",
          }}>Aprende cualquier tema con IA</h1>
          <p style={{
            margin: 0, fontFamily: "Georgia, serif",
            fontSize: "12px", color: "#6a5a38",
          }}>Powered by Gemini 2.5 Flash · gratis, sin tarjeta de crédito</p>
        </div>
      </div>

      {/* API Key + Inputs */}
      <div style={{ padding: "16px 20px", maxWidth: "600px", margin: "0 auto" }}>

        {/* API Key */}
        <div style={{
          background: "rgba(180,130,40,0.05)",
          border: "1px solid rgba(180,150,80,0.18)",
          borderRadius: "12px",
          padding: "14px 16px",
          marginBottom: "10px",
        }}>
          <label style={{
            fontFamily: "'DM Mono', monospace", fontSize: "9px",
            color: "#7a6a4a", letterSpacing: "0.15em", display: "block", marginBottom: "6px",
          }}>
            🔑 GEMINI API KEY —{" "}
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#c4a84a", textDecoration: "none" }}
            >
              Obtener gratis en aistudio.google.com →
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
                transition: "border 0.2s",
              }}
            />
            <button
              aria-label={showKey ? "Ocultar API Key" : "Mostrar API Key"}
              onClick={() => setShowKey(!showKey)}
              style={{
                position: "absolute", right: "8px", top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(180,150,80,0.05)", 
                border: "1px solid rgba(180,150,80,0.1)", 
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
              marginTop: "5px", fontFamily: "'DM Mono', monospace",
              fontSize: "9px", color: "#6ee7b7", letterSpacing: "0.1em",
            }}>✓ API key ingresada</div>
          )}
        </div>

        {/* Tema + contenido */}
        <div style={{
          background: "rgba(180,130,40,0.04)",
          border: "1px solid rgba(180,150,80,0.14)",
          borderRadius: "12px",
          padding: "14px 16px",
          marginBottom: "4px",
        }}>
          <label style={{
            fontFamily: "'DM Mono', monospace", fontSize: "9px",
            color: "#7a6a4a", letterSpacing: "0.15em", display: "block", marginBottom: "6px",
          }}>TEMA A ESTUDIAR</label>
          <input
            type="text"
            value={tema}
            onChange={e => setTema(e.target.value)}
            placeholder="ej: Fotosíntesis, Revolución Francesa, Big O Notation..."
            style={{
              width: "100%", background: "rgba(0,0,0,0.35)",
              border: "1px solid rgba(180,150,80,0.2)", borderRadius: "7px",
              padding: "10px 12px", color: "#f0d898",
              fontFamily: "Georgia, serif", fontSize: "13px", marginBottom: "12px",
            }}
          />

          <button
            aria-expanded={showContent}
            aria-controls="content-input"
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
              value={contenido}
              onChange={e => setContenido(e.target.value)}
              placeholder="Pega aquí tu texto crudo, capítulo del libro, tus apuntes, lo que sea..."
              rows={5}
              style={{
                width: "100%", background: "rgba(0,0,0,0.35)",
                border: "1px solid rgba(180,150,80,0.15)", borderRadius: "7px",
                padding: "10px 12px", color: "#c4a878",
                fontFamily: "'DM Mono', monospace", fontSize: "11px",
                lineHeight: "1.7", resize: "vertical",
              }}
            />
          )}
        </div>

        {tema && apiKey && (
          <div style={{
            fontFamily: "'DM Mono', monospace", fontSize: "9px",
            color: "#c4a84a", letterSpacing: "0.1em", padding: "4px 2px",
          }}>
            ⚡ Listo — presiona "Generar con Gemini" en cualquier sección
          </div>
        )}
      </div>

      {/* Tabs */}
      <div style={{ padding: "8px 20px 0", maxWidth: "600px", margin: "0 auto" }}>
        <div style={{ display: "flex", gap: "6px" }}>
          {LEVEL_GROUPS.map((g, i) => (
            <button
              key={i}
              onClick={() => setActiveGroup(i)}
              style={{
                flex: 1, padding: "10px 6px",
                background: activeGroup === i ? "rgba(18,16,10,0.95)" : "rgba(18,16,10,0.4)",
                border: `1px solid ${activeGroup === i ? g.color + "55" : "rgba(180,150,80,0.1)"}`,
                borderBottom: activeGroup === i ? `2px solid ${g.color}` : "1px solid rgba(180,150,80,0.1)",
                borderRadius: "8px 8px 0 0",
                cursor: "pointer",
                fontFamily: "'DM Mono', monospace", fontSize: "9px",
                color: activeGroup === i ? g.color : "#4a3c22",
                letterSpacing: "0.06em", transition: "all 0.2s", textAlign: "center",
              }}
            >{g.label}</button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div style={{
        padding: "0 20px 40px", maxWidth: "600px", margin: "0 auto",
        background: "rgba(18,16,10,0.6)",
        borderRadius: "0 0 12px 12px",
        border: "1px solid rgba(180,150,80,0.08)", borderTop: "none",
      }}>
        <div style={{ padding: "14px 0 8px" }}>
          <div style={{
            fontFamily: "'DM Mono', monospace", fontSize: "9px",
            color: group.color + "88", letterSpacing: "0.15em", marginBottom: "12px",
          }}>
            {group.label.toUpperCase()} — {groupActions.length} HERRAMIENTAS
          </div>
          {groupActions.map(a => (
            <ActionCard key={a.id} action={a} tema={tema} contenido={contenido} apiKey={apiKey} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        maxWidth: "600px", margin: "12px auto 32px",
        padding: "0 20px",
        fontFamily: "'DM Mono', monospace", fontSize: "9px",
        color: "#3a2e18", textAlign: "center", letterSpacing: "0.05em",
      }}>
        Gemini 2.5 Flash · 250 requests/día gratis · sin tarjeta · aistudio.google.com
      </div>
    </main>
  );
}
