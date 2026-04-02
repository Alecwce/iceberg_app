import React, { useEffect } from "react";

export function useKeyboardShortcut(key, callback, modifiers = {}) {
  const { ctrl = false, shift = false, alt = false } = modifiers;

  useEffect(() => {
    const handler = (e) => {
      const matchKey = e.key.toLowerCase() === key.toLowerCase();
      const matchCtrl = ctrl ? (e.ctrlKey || e.metaKey) : !e.ctrlKey && !e.metaKey;
      const matchShift = shift ? e.shiftKey : !e.shiftKey;
      const matchAlt = alt ? e.altKey : !e.altKey;

      if (matchKey && matchCtrl && matchShift && matchAlt) {
        e.preventDefault();
        callback();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [key, callback, ctrl, shift, alt]);
}

export function useAppShortcuts({ 
  onToggleKey, 
  onToggleContent, 
  onGenerate, 
  onNextTab, 
  onPrevTab 
}) {
  useKeyboardShortcut("k", onToggleKey, { ctrl: true });
  useKeyboardShortcut("c", onToggleContent, { ctrl: true, shift: true });
  useKeyboardShortcut("Enter", onGenerate, { ctrl: true });
  useKeyboardShortcut("ArrowRight", onNextTab, { ctrl: true });
  useKeyboardShortcut("ArrowLeft", onPrevTab, { ctrl: true });
}