import React, { useState, useEffect } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const item = window.localStorage.getItem("iceberg-favorites");
      return item ? JSON.parse(item) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem("iceberg-favorites", JSON.stringify(favorites));
    } catch (e) {
      console.error("Error saving favorites:", e);
    }
  }, [favorites]);

  const addFavorite = (topic, content = "") => {
    if (favorites.some(f => f.topic === topic)) return;
    const entry = {
      id: Date.now(),
      topic,
      content,
      addedAt: new Date().toISOString(),
    };
    setFavorites(prev => [entry, ...prev]);
  };

  const removeFavorite = (id) => {
    setFavorites(prev => prev.filter(f => f.id !== id));
  };

  const isFavorite = (topic) => favorites.some(f => f.topic === topic);

  return { favorites, addFavorite, removeFavorite, isFavorite };
}