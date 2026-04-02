# 🧊 Iceberg Prompts

App de estudio con IA (Gemini) que implementa el método iceberg para aprender cualquier tema mediante técnicas de aprendizaje profundo.

## 🚀 Características

- **7 acciones de estudio**: Outline, Feynman, Cornell, Quiz, Flashcards, Plan 2-3-5-7, Test de Retención
- **Gemini API integrada**: Sin backend, conexión directa desde el frontend
- **Persistencia**: API key y temas guardados en localStorage
- **Historial**: Registro de estudios realizados
- **Favoritos**: Guardar temas para rápido acceso
- **Exportar**: Descargar resultados en Markdown o PDF
- **Keyboard shortcuts**: Navegación rápida
- **Toast notifications**: Feedback visual

## 📁 Estructura

```
src/
├── App.jsx                 # Componente principal
├── main.jsx               # Entry point
├── data/
│   └── actions.js         # Definición de las 7 acciones de estudio
├── hooks/
│   ├── useGemini.js       # Integración con Gemini API
│   ├── useLocalStorage.js # Persistencia de datos
│   ├── useHistory.js      # Historial de estudios
│   ├── useFavorites.js    # Temas favoritos
│   ├── useToast.js       # Notificaciones toast
│   └── useKeyboardShortcuts.js # Atajos de teclado
├── components/
│   ├── Header.jsx        # Encabezado de la app
│   ├── ActionCard.jsx    # Tarjeta de cada acción
│   ├── ResultBlock.jsx   # Bloque de resultados con export
│   ├── Spinner.jsx       # Loading spinner
│   ├── HistoryPanel.jsx  # Panel de historial
│   ├── FavoritesPanel.jsx # Panel de favoritos
│   └── ToastContainer.jsx # Contenedor de toasts
└── test/
    ├── setup.js          # Configuración de tests
    └── Spinner.test.jsx  # Ejemplo de test
```

## 🛠️ Instalación

```bash
npm install
npm start
```

## 📝 Scripts

| Script | Descripción |
|--------|-------------|
| `npm start` | Iniciar servidor de desarrollo (http://localhost:5173) |
| `npm run build` | Build de producción |
| `npm run test` | Ejecutar tests |
| `npm run lint` | Verificar código con ESLint |
| `npm run format` | Formatear código con Prettier |

## ⌨️ Keyboard Shortcuts

| Atajo | Acción |
|-------|--------|
| `Ctrl+K` | Mostrar/ocultar API key |
| `Ctrl+Shift+C` | Mostrar/ocultar contenido |
| `Ctrl+Enter` | Generar resultado |
| `Ctrl+←` / `Ctrl+→` | Cambiar entre pestañas |

## 🔑 API Key

Obtén tu API key gratuita en [Google AI Studio](https://aistudio.google.com/app/apikey)

Límite: 250 requests/día gratis, sin tarjeta de crédito.

## 📦 Dependencias

- **React 18** - Framework UI
- **Vite** - Build tool
- **Vitest** - Testing
- **ESLint** - Linting
- **Prettier** - Formateo

## 🎨 Theme

- Fondo: `#0d0b07`
- Acento dorado: `#f59e0b`
- Verde éxito: `#34d399`
- Rojo retención: `#f87171`

## 📄 Licencia

MIT