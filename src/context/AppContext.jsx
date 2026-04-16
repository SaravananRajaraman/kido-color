/**
 * context/AppContext.jsx
 *
 * Global app state: current mode, selected tool, colour, brush size,
 * current letter, and progress tracking.
 */
import { createContext, useContext, useState } from 'react';
import { useProgress } from '../hooks/useProgress.js';

const AppContext = createContext(null);

export const MODES = { HOME: 'home', COLOR: 'color', TRACE: 'trace', DRAW: 'draw' };
export const TOOLS = {
  PENCIL:    'pencil',
  SKETCH:    'sketch',
  CRAYON:    'crayon',
  WATER:     'water',
  POSTER:    'poster',
  OIL:       'oil',
  FILL:      'fill',
  ERASER:    'eraser',
};
export const SIZES  = { S: 3, M: 6, L: 12, XL: 22 };

export function AppProvider({ children }) {
  const [mode,          setMode]         = useState(MODES.HOME);
  const [tool,          setTool]         = useState(TOOLS.PENCIL);
  const [color,         setColor]        = useState('#FF0000');
  const [brushSize,     setBrushSize]    = useState(SIZES.M);
  const [letter,        setLetter]       = useState('A');
  const [panelOpen,     setPanelOpen]    = useState(false);
  const [saveOpen,      setSaveOpen]     = useState(false);

  const { progress, markComplete, resetProgress, isCompleted, completedCount } = useProgress();

  function selectTool(t) {
    setTool(t);
    setPanelOpen(false); // auto-hide panel on tool select
  }

  return (
    <AppContext.Provider value={{
      mode, setMode,
      tool, setTool: selectTool,
      color, setColor,
      brushSize, setBrushSize,
      letter, setLetter,
      panelOpen, setPanelOpen,
      saveOpen, setSaveOpen,
      // progress tracking
      progress,
      markComplete,
      resetProgress,
      isCompleted,
      completedCount,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
}
