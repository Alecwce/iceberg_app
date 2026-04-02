import React, { useState } from "react";

const GEMINI_MODEL = "gemini-2.0-flash-exp";

export function useGemini() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const generate = async ({ apiKey, systemPrompt, userPrompt }) => {
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

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: systemPrompt }] },
            contents: [{ role: "user", parts: [{ text: userPrompt }] }],
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