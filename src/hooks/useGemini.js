import React, { useState } from "react";

export function useGemini() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const generate = async ({ apiKey, systemPrompt, userPrompt, model = "gemini-2.5-flash" }) => {
    if (!apiKey?.trim()) {
      setError("Ingresa tu API key de Gemini");
      return null;
    }
    if (!userPrompt?.trim()) {
      setError("Ingresa un tema a estudiar");
      return null;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const payload = {
      contents: [{ 
        role: "user", 
        parts: [{ text: `INSTRUCTIONS:\n${systemPrompt}\n\nUSER TOPIC:\n${userPrompt}` }] 
      }],
      generationConfig: { 
        temperature: 0.7, 
        maxOutputTokens: 2048,
        topP: 0.95,
        topK: 40
      }
    };

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        let msg = `Error ${res.status}`;
        try {
          const err = await res.json();
          msg = err?.error?.message || msg;
        } catch(e) {}
        
        if (res.status === 429) {
          throw new Error("Límite de cuota excedido (429). Selecciona 'Gemini 2.5 Flash-Lite' o espera 60 segundos.");
        }
        
        if (res.status === 404) {
          throw new Error(`Modelo '${model}' no encontrado (404). El servidor de Google reporta que el ID ya no existe.`);
        }
        
        throw new Error(msg);
      }

      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        throw new Error("Respuesta vacía de Gemini.");
      }

      setResult(text);
      return text;
    } catch (e) {
      setError(e.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return { generate, loading, result, error, reset };
}