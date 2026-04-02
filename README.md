# 🧊 Iceberg Prompts — Estudio Profundo con IA

![Lighthouse Score](https://img.shields.io/badge/Lighthouse-100%2F100-success?style=for-the-badge&logo=lighthouse&logoColor=white)
![Accessibility](https://img.shields.io/badge/Accessibility-WCAG%202.2-blue?style=for-the-badge&logo=accessible-icon)
![SEO](https://img.shields.io/badge/SEO-Optimized-gold?style=for-the-badge&logo=google-search-console)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)

**Iceberg Prompts** es una aplicación de estudio de alto rendimiento que utiliza la **IA de Google Gemini** para aplicar metodologías de aprendizaje profundo. Diseñada con una estética *Premium Dark* y optimizada bajo los estándares más estrictos de **SEO y Accesibilidad (WCAG 2.2)**.

---

## ✨ Características Principales

*   **🧠 Metodología Iceberg**: 7 acciones críticas para pasar del entendimiento superficial a la maestría.
    *   *Nivel 1 (Estudiar)*: Outline, Cornell, Feynman.
    *   *Nivel 2 (Repasar)*: Quiz interactivo, Flashcards inteligentes.
    *   *Nivel 3 (Retener)*: Planificación 2-3-5-7, Test de Retención profunda.
*   **💎 Estética Premium**: Interfaz basada en *Glassmorphism*, con desenfoques de fondo dinámicos y micro-animaciones suaves.
*   **♿ Accesibilidad 100/100**: Cumplimiento total de roles ARIA, navegación por teclado mejorada y tamaños de objetivos táctiles optimizados (WCAG 2.5.8).
*   **🚀 Rendimiento Local**: Sin backend. Conexión directa y segura con la API de Gemini desde el navegador con persistencia en `localStorage`.
*   **📄 Exportación Profesional**: Descarga tus lecciones y esquemas en formato **Markdown (.md)** o prepáralos para impresión en **PDF**.

---

## 🛠️ Tecnologías

| Core | Estilo | Calidad |
|------|--------|---------|
| **React 19** | **Vanilla CSS (Glassmorphism)** | **Vitest** (Unit Testing) |
| **Vite 6** | **Google Fonts** (Inter, Playfair) | **Lighthouse Audit** (100/100) |
| **Gemini API** | **SVG Icons** (Hand-crafted) | **ESLint & Prettier** |

---

## 🚦 Guía de Inicio Rápido

### Requisitos Previos
*   [Node.js](https://nodejs.org/) (v18+)
*   Una API Key de **Google AI Studio** (Consíguela gratis [aquí](https://aistudio.google.com/app/apikey))

### Instalación
1.  Clona el repositorio:
    ```bash
    git clone https://github.com/TU_USUARIO/iceberg_app.git
    cd iceberg_app
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Inicia el entorno de desarrollo:
    ```bash
    npm start
    ```

---

## ⌨️ Comandos de Teclado (Power User)

Domina la aplicación sin despegar las manos del teclado:

*   `Ctrl + K`: Mostrar/Ocultar el panel de la API Key.
*   `Ctrl + Shift + C`: Expandir/Colapsar el área de contenido.
*   `Ctrl + Enter`: Disparar la generación de la IA.
*   `Ctrl + ←` / `→`: Navegar entre las pestañas de aprendizaje.

---

## 📂 Estructura del Proyecto

```text
src/
├── components/          # Componentes visuales (Header, ActionCard, ResultBlock...)
├── hooks/               # Lógica reutilizable (useGemini, useHistory, useLocalStorage...)
├── data/                # Definición de prompts y lógica de negocio
└── App.jsx              # Orquestador principal y diseño premium
public/
├── robots.txt           # Configuración SEO
└── sitemap.xml          # Mapa del sitio para Google
```

---

## 🏆 Certificación de Calidad

Esta aplicación ha sido auditada rigurosamente para garantizar la mejor experiencia de usuario:
*   **SEO**: Optimización de meta-datos y estructura semántica para máxima visibilidad.
*   **Accesibilidad**: Navegación secuencial, etiquetas descriptivas y contraste de color optimizado.
*   **Privacidad**: Tu API Key nunca sale de tu navegador; se almacena de forma segura y cifrada localmente.

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**. Siéntete libre de usarlo, mejorarlo y compartirlo.

---
*Desarrollado con pasión para transformar la forma en que estudiamos.* 🧊✨