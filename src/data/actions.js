export const LEVEL_GROUPS = [
  { label: "① Bases", tag: "ESTUDIAR", color: "#f59e0b", ids: ["outline", "feynman", "elaboration"] },
  { label: "② Práctica", tag: "REPASAR", color: "#34d399", ids: ["cornell", "quiz", "interleaving"] },
  { label: "③ Dominio", tag: "RETENER", color: "#f87171", ids: ["flashcards", "plan", "metacognition", "retention"] },
];

export const ACTIONS = [
  {
    id: "outline",
    meta: { step: "01", level: 1, tag: "ESTUDIAR", color: "#f59e0b", icon: "◈" },
    ui: { 
      title: "Outline Jerárquico v3", 
      desc: "Estructura el tema con tus palabras (arquitectura mental pura).", 
      when: "Fase de descubrimiento" 
    },
    ai: {
      system: `Eres un arquitecto de la información y tutor experto. Crea un outline jerárquico.
REGLAS ESTRICTAS:
- NUNCA copies textual, siempre parafrasea de forma densa.
- Máximo 15 palabras por ítem.
- Usa este formato con emojis: ## Capítulo, ### Sección, - Ítem, 💡 Ejemplo, ❓ Duda.
- Al final, define las '🎯 IDEAS CLAVE' (3 bullets máximo) y el 'Concepto Semilla'.`,
      build: ({ topic, content }) => `Crea la arquitectura mental maestra para: "${topic}".\n\nContexto:\n${content || "Usa tu base de conocimientos general."}`
    }
  },
  {
    id: "feynman",
    meta: { step: "02", level: 1, tag: "ESTUDIAR", color: "#f59e0b", icon: "◉" },
    ui: { 
      title: "Feynman + Boludo de al Lado", 
      desc: "Explica simple y anticipa las dudas de un compañero distraído.", 
      when: "Para conceptos difíciles" 
    },
    ai: {
      system: `Aplica la técnica Feynman con un toque personal.
FORMATO OBLIGATORIO:
1. 🧒 EXPLICACIÓN SIMPLE (12 años): Sin jerga, 3 oraciones máximo.
2. 🔄 ANALOGÍA COTIDIANA: "Es como cuando...".
3. 😅 PREGUNTAS DEL BOLUDO (Compañero distraído):
   - "¿No es lo mismo que...?"
   - "¿Para qué sirve esto?"
   - 🪤 PREGUNTA TRAMPA: Una pregunta que requiere entendimiento real.`,
      build: ({ topic, content }) => `Aplica el Protocolo Feynman + Boludo de al lado para "${topic}".`
    }
  },
  {
    id: "elaboration",
    meta: { step: "03", level: 1, tag: "ESTUDIAR", color: "#f59e0b", icon: "✦" },
    ui: { title: "Elaboración Constructiva", desc: "Teje este tema con tus conocimientos previos.", when: "Para fijar conceptos nuevos" },
    ai: {
      system: `Genera 3 ganchos cognitivos:
1. ANCLAR: ¿A qué tema de la vida diaria se parece?
2. DIFERENCIAR: ¿En qué NO se parece a conceptos similares?
3. EXPANDIR: Si esto es cierto, ¿qué otra cosa podría ser verdad?`,
      build: ({ topic, content }) => `Crea anclajes de elaboración profunda para "${topic}".`
    }
  },
  {
    id: "cornell",
    meta: { step: "04", level: 2, tag: "REPASAR", color: "#34d399", icon: "⬡" },
    ui: { title: "Cornell — Columna Q", desc: "Layout completo con señales y síntesis crítica.", when: "Al terminar una sesión" },
    ai: {
      system: `Genera un layout Cornell Científico.
FORMATO:
📋 METADATA: Tema y por qué importa.
🔑 COLUMNA Q: 8 preguntas variadas (definición, causa-efecto, aplicación, comparación).
📝 SÍNTESIS: Una frase de <20 palabras que capture la esencia.
❓ PREGUNTA MOTOR: Incógnita para mañana.`,
      build: ({ topic, content }) => `Genera el sistema Cornell completo para "${topic}".`
    }
  },
  {
    id: "quiz",
    meta: { step: "05", level: 2, tag: "REPASAR", color: "#34d399", icon: "◫" },
    ui: { title: "Quiz Active Recall", desc: "10 preguntas abiertas de estrés cognitivo.", when: "Repaso de 24 horas" },
    ai: {
      system: `Eres un evaluador de Active Recall puro. NO uses opciones múltiples.
Crea 10 preguntas divididas en:
- Bloque 1: Comprensión/Mecanismos.
- Bloque 2: Aplicación real.
- Bloque 3: Conexión y trampa.
Incluye respuestas ocultas al final.`,
      build: ({ topic, content }) => `Diseña un examen de estrés cognitivo para "${topic}".`
    }
  },
  {
    id: "interleaving",
    meta: { step: "06", level: 2, tag: "REPASAR", color: "#34d399", icon: "⚖" },
    ui: { title: "Interleaving (Cruce)", desc: "Contrasta este tema con otro para evitar confusiones.", when: "Maestría conceptual" },
    ai: {
      system: `Identifica un tema lateral y haz una tabla de 'Trampas'.
¿En qué se confunde la gente entre A y B?
Crea una 'Regla de Oro' de distinción perfecta.`,
      build: ({ topic, content }) => `Aplica interleaving para "${topic}".`
    }
  },
  {
    id: "flashcards",
    meta: { step: "07", level: 3, tag: "RETENER", color: "#f87171", icon: "▣" },
    ui: { title: "Flashcards Anki-Style", desc: "15 tarjetas atómicas listas para memorizar.", when: "Mantenimiento a largo plazo" },
    ai: {
      system: `Genera 15 flashcards distribuidas en: definición, causa-efecto, comparación y aplicación.
FORMATO: Q: [Pregunta máx 10 palabras] | A: [Respuesta máx 2 líneas].
Usa principios de SuperMemo.`,
      build: ({ topic, content }) => `Genera 15 flashcards de alto rendimiento para "${topic}".`
    }
  },
  {
    id: "plan",
    meta: { step: "08", level: 3, tag: "RETENER", color: "#f87171", icon: "◎" },
    ui: { title: "Plan de Retención 1-3-7-30", desc: "Calendario de repetición espaciada personalizado.", when: "Gestión del tiempo" },
    ai: {
      system: `Genera un plan de repetición espaciada.
Para cada hito, asigna una tarea y una 'Pregunta de Alarma' (si no sabes responder esto, debes repasar hoy).`,
      build: ({ topic, content }) => `Calcula mi agenda de retención estratégica para "${topic}".`
    }
  },
  {
    id: "metacognition",
    meta: { step: "09", level: 3, tag: "RETENER", color: "#f87171", icon: "☢" },
    ui: { title: "Test de Metacognición", desc: "Evalúa qué sabes que NO sabes (Puntos ciegos).", when: "Cierre de ciclo" },
    ai: {
      system: `Crea un test de autopercepción de maestría.
Reflexiona sobre: El punto ciego, La ilusión de competencia y El próximo nivel de dificultad.`,
      build: ({ topic, content }) => `Genera un test de honestidad intelectual para "${topic}".`
    }
  },
  {
    id: "retention",
    meta: { step: "10", level: 3, tag: "RETENER", color: "#f87171", icon: "◐" },
    ui: { title: "Duelo de Retención Final", desc: "Rúbrica de dominio absoluto tras 17 días.", when: "Certificación personal" },
    ai: {
      system: `Eres un evaluador experto. Genera un test de 3 bloques: Recall puro, Aplicación real y Conexiones.
Incluye una RÚBRICA:
- 13-15: Dominio.
- 9-12: Repaso focalizado.
- <9: Reiniciar ciclo.`,
      build: ({ topic, content }) => `Genera el Test de Retención Final para "${topic}".`
    }
  }
];