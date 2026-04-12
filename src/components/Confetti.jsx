/**
 * components/Confetti.jsx
 * Simple CSS-animation confetti burst.
 */
import { useEffect, useRef } from 'react';
import { CONFETTI_COLORS } from '../data/palette.js';

export default function Confetti({ onDone }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const pieces = [];
    for (let i = 0; i < 80; i++) {
      const el = document.createElement('div');
      el.className = 'confetti-piece';
      const color   = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
      const size    = 6 + Math.random() * 10;
      const left    = Math.random() * 100;
      const delay   = Math.random() * 0.8;
      const dur     = 1.8 + Math.random() * 1.2;
      el.style.cssText = `
        background:${color};
        width:${size}px; height:${size}px;
        left:${left}%;
        top:0;
        animation: confettiFall ${dur}s ${delay}s linear forwards;
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      `;
      container.appendChild(el);
      pieces.push(el);
    }
    const timer = setTimeout(() => {
      pieces.forEach(p => p.remove());
      onDone?.();
    }, 3500);
    return () => { clearTimeout(timer); pieces.forEach(p => p.remove()); };
  }, []);

  return <div className="confetti-container" ref={containerRef} aria-hidden="true"/>;
}
