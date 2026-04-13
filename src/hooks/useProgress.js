/**
 * hooks/useProgress.js
 *
 * Persists A–Z completion progress to localStorage.
 * Tracks separately for trace and color modes.
 *
 * Shape stored in localStorage under 'kido-progress':
 * {
 *   trace: { completedLetters: ['A','B',...] },
 *   color: { completedLetters: ['A','B',...] },
 * }
 */
import { useState, useCallback } from 'react';

const STORAGE_KEY = 'kido-progress';

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { trace: { completedLetters: [] }, color: { completedLetters: [] } };
    const parsed = JSON.parse(raw);
    return {
      trace: { completedLetters: Array.isArray(parsed?.trace?.completedLetters) ? parsed.trace.completedLetters : [] },
      color: { completedLetters: Array.isArray(parsed?.color?.completedLetters) ? parsed.color.completedLetters : [] },
    };
  } catch {
    return { trace: { completedLetters: [] }, color: { completedLetters: [] } };
  }
}

function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Ignore storage errors (e.g. private mode)
  }
}

export function useProgress() {
  const [progress, setProgress] = useState(() => loadProgress());

  const markComplete = useCallback((mode, letter) => {
    setProgress(prev => {
      const modeKey = mode === 'trace' ? 'trace' : 'color';
      const already = prev[modeKey].completedLetters.includes(letter);
      if (already) return prev;
      const updated = {
        ...prev,
        [modeKey]: {
          ...prev[modeKey],
          completedLetters: [...prev[modeKey].completedLetters, letter],
        },
      };
      saveProgress(updated);
      return updated;
    });
  }, []);

  const resetProgress = useCallback((mode) => {
    setProgress(prev => {
      const updated = mode
        ? { ...prev, [mode]: { completedLetters: [] } }
        : { trace: { completedLetters: [] }, color: { completedLetters: [] } };
      saveProgress(updated);
      return updated;
    });
  }, []);

  function isCompleted(mode, letter) {
    const modeKey = mode === 'trace' ? 'trace' : 'color';
    return progress[modeKey].completedLetters.includes(letter);
  }

  function completedCount(mode) {
    const modeKey = mode === 'trace' ? 'trace' : 'color';
    return progress[modeKey].completedLetters.length;
  }

  return { progress, markComplete, resetProgress, isCompleted, completedCount };
}
