import { useState } from "react";

export function usePromptEngine() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const runPrompt = async ({ action, topic, content }) => {
    setLoading(true);

    const prompt = action.ai.build({ topic, content });

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: action.ai.system,
          prompt,
        }),
      });

      const data = await res.json();
      setResult(data.output);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { runPrompt, loading, result };
}
