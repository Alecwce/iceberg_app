import React, { useState, useEffect } from "react";

export function useHistory() {
  const [history, setHistory] = useState(() => {
    try {
      const item = window.localStorage.getItem("iceberg-history");
      return item ? JSON.parse(item) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem("iceberg-history", JSON.stringify(history));
    } catch (e) {
      console.error("Error saving history:", e);
    }
  }, [history]);

  const addEntry = (topic, actionId, result) => {
    const entry = {
      id: Date.now(),
      topic,
      actionId,
      result: result.substring(0, 100) + "...",
      timestamp: new Date().toISOString(),
    };
    setHistory(prev => [entry, ...prev].slice(0, 50));
  };

  const clearHistory = () => setHistory([]);

  return { history, addEntry, clearHistory };
}