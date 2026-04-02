export const LEVEL_GROUPS = [
  { label: "① Bases", tag: "ESTUDIAR", color: "#f59e0b", ids: ["outline", "feynman", "elaboration"] },
  { label: "② Práctica", tag: "REPASAR", color: "#34d399", ids: ["cornell", "quiz", "interleaving"] },
  { label: "③ Dominio", tag: "RETENER", color: "#f87171", ids: ["flashcards", "plan", "metacognition"] },
];

export const ACTIONS = [
  {
    id: "outline",
    meta: { step: "01", level: 1, tag: "ESTUDIAR", color: "#f59e0b", icon: "◈" },
    ui: { title: "Outline de Maestría", desc: "Arquitectura mental del tema con jerarquía pura.", when: "Fase de descubrimiento" },
    ai: {
      system: `Eres un arquitecto de la información. Crea un outline jerárquico que descomponga el tema en sus átomos fundamentales.
REGLAS:
- No utilices relleno. Solo conceptos con significado denso.
- Máximo 3 niveles de profundidad.
- Formato: use Markdown con emojis de puntos (◆, ◇, ▪).
- Al final, define el 'Concepto Semilla' (la idea que si se entiende, todo lo demás cae por su propio peso).`,
      build: ({ topic, content }) => `Crea la arquitectura mental maestra para: "${topic}".\n\nContexto:\n${content || "No hay apuntes, usa tu base de conocimientos general."}`
    }
  },
  {
    id: "feynman",
    meta: { step: "02", level: 1, tag: "ESTUDIAR", color: "#f59e0b", icon: "◉" },
    ui: { title: "Protocolo Feynman", desc: "Explicación a un niño + Analogía Visual.", when: "Para conceptos difíciles" },
    ai: {
      system: `Aplica la técnica de Richard Feynman pero con un enfoque en la visualización.
1. EXPLICACIÓN (6 años): ¿Cómo se lo contarías a un niño?
2. LA ANALOGÍA DEL OBJETO: Compara este concepto con un objeto de la casa.
3. EL PUNTO DE RUPTURA: ¿Dónde falla esta explicación o analogía? (Esto evita entender a medias).`,
      build: ({ topic, content }) => `Explícame "${topic}" usando el Protocolo Feynman. Si hay datos técnicos en este contexto:\n${content}, tradúcelos a metáforas.`
    }
  },
  {
    id: "elaboration",
    meta: { step: "03", level: 1, tag: "ESTUDIAR", color: "#f59e0b", icon: "✦" },
    ui: { title: "Elaboración Constructiva", desc: "Conecta este tema con lo que YA sabes.", when: "Para fijar conocimientos nuevos" },
    ai: {
      system: `Tu tarea es ayudar al estudiante a 'tejer' el nuevo conocimiento con el viejo. 
Genera 3 ganchos cognitivos:
1. ANCLAR: ¿A qué tema común de la vida diaria se parece?
2. DIFERENCIAR: ¿En qué NO se parece a [concepto similar]? 
3. EXPANDIR: Si esto es cierto, ¿qué otra cosa totalmente distinta podría ser cierta?`,
      build: ({ topic, content }) => `Crea anclajes de elaboración para "${topic}".`
    }
  },
  {
    id: "cornell",
    meta: { step: "04", level: 2, tag: "REPASAR", color: "#34d399", icon: "⬡" },
    ui: { title: "Cornell Científico", desc: "Columna de señales y síntesis crítica.", when: "Al terminar una sesión" },
    ai: {
      system: `Genera un sistema Cornell de alta densidad.
- SEÑALES (Cue): Preguntas que disparan el recuerdo de los bloques de información.
- SÍNTESIS CRÍTICA: Resume el tema en una sola frase de no más de 20 palabras que capture la esencia.
- PREGUNTA MOTOR: ¿Qué pregunta queda abierta para investigar mañana?`,
      build: ({ topic, content }) => `Formato Cornell para: "${topic}".`
    }
  },
  {
    id: "quiz",
    meta: { step: "05", level: 2, tag: "REPASAR", color: "#34d399", icon: "◫" },
    ui: { title: "Active Recall Puro", desc: "Test de estrés cognitivo sin pistas.", when: "Repaso de 24 horas" },
    ai: {
      system: `Crea un test de estres. 5 preguntas que no pregunten DEFINICIONES, sino MECANISMOS.
Ej: No preguntes "¿Qué es X?", pregunta "¿Qué pasaría con el sistema si quitamos X?".
Incluye las respuestas al final en un bloque ocultable.`,
      build: ({ topic, content }) => `Diseña un test de estrés cognitivo para "${topic}".`
    }
  },
  {
    id: "interleaving",
    meta: { step: "06", level: 2, tag: "REPASAR", color: "#34d399", icon: "⚖" },
    ui: { title: "Intercambio Mezclado", desc: "Contrasta este tema con otro lateral.", when: "Para evitar la confusión de temas" },
    ai: {
      system: `Busca un tema relacionado (o pídelo al usuario) y haz un cuadro comparativo de 'Trampas'.
¿En qué se confunde la gente entre el Tema A y el Tema B?
Crea una 'Regla de Oro' para distinguirlos siempre.`,
      build: ({ topic, content }) => `Aplica interleaving para "${topic}". Sugiere un tema con el que se suela confundir y compáralos.`
    }
  },
  {
    id: "flashcards",
    meta: { step: "07", level: 3, tag: "RETENER", color: "#f87171", icon: "▣" },
    ui: { title: "Flashcards Atómicas", desc: "Tarjetas de un solo dato para Anki.", when: "Mantenimiento a largo plazo" },
    ai: {
      system: `Genera 10 flashcards siguiendo los 20 principios de SuperMemo.
- Un solo dato por tarjeta.
- Usa lenguaje 'Close Deletion' (rellenar huecos) para conceptos abstractos.
- Formato: Q: [Pregunta] | A: [Respuesta].`,
      build: ({ topic, content }) => `Flashcards atómicas para "${topic}".`
    }
  },
  {
    id: "plan",
    meta: { step: "08", level: 3, tag: "RETENER", color: "#f87171", icon: "◎" },
    ui: { title: "Agenda de Retención", desc: "Calendario de repetición espaciada ajustado.", when: "Gestión del tiempo" },
    ai: {
      system: `Genera una agenda 1-3-7-14-30 días.
Para cada día, asigna una tarea distinta:
1: Active Recall intenso.
3: Elaboración de analogías.
7: Responder preguntas de otros.
...y así.`,
      build: ({ topic, content }) => `Calcula mi agenda de retención para "${topic}".`
    }
  },
  {
    id: "metacognition",
    meta: { step: "09", level: 3, tag: "RETENER", color: "#f87171", icon: "☢" },
    ui: { title: "Test de Metacognición", desc: "Evalúa qué sabes que NO sabes.", when: "Cierre de ciclo" },
    ai: {
      system: `Eres un experto en metacognición. Haz que el usuario reflexione sobre sus vacíos.
1. EL PUNTO CIEGO: ¿Cuál es la parte de "${topic}" que más te costó explicar hoy?
2. LA ILUSIÓN DE COMPETENCIA: ¿Qué parte crees que sabes porque te suena, pero no podrías reconstruir de cero?
3. EL PRÓXIMO NIVEL: Si fueras a escribir un libro de esto, ¿qué capítulo te daría más miedo escribir?`,
      build: ({ topic, content }) => `Genera un test de autopercepción de maestría para "${topic}".`
    }
  }
];