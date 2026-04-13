/**
 * hooks/useAudio.js
 *
 * Web Audio API sound feedback – no audio files required.
 * An AudioContext is created lazily on the first call so it complies
 * with browser autoplay policies (must be triggered by a user gesture).
 */

let audioCtx = null;

function getAudioCtx() {
  if (!audioCtx) {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch {
      /* unsupported browser – sounds will be silently skipped */
    }
  }
  return audioCtx;
}

/**
 * Play a synthetic tone.
 * @param {number} freq      - frequency in Hz
 * @param {OscillatorType} type - oscillator wave type
 * @param {number} duration  - total duration in seconds
 * @param {number} vol       - initial gain (0–1)
 */
function playTone(freq, type, duration, vol) {
  const ac = getAudioCtx();
  if (!ac) return;
  try {
    const osc  = ac.createOscillator();
    const gain = ac.createGain();
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.type            = type || 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol || 0.18, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + duration);
    osc.start();
    osc.stop(ac.currentTime + duration);
  } catch {
    /* ignore – context may have been suspended */
  }
}

/** Short click sound – buttons, tool picks, undo/redo */
export function playClick() {
  playTone(660, 'sine', 0.10, 0.20);
}

/** Higher-pitched select sound – letter / category selection */
export function playSelect() {
  playTone(880, 'sine', 0.12, 0.18);
}

/** Ascending chord – tracing / coloring celebration */
export function playCelebrate() {
  [523, 659, 784, 1047].forEach((f, i) => {
    setTimeout(() => playTone(f, 'triangle', 0.22, 0.22), i * 120);
  });
}

/**
 * React hook that returns the audio helpers.
 * Components can destructure only the sounds they need.
 */
export default function useAudio() {
  return { playClick, playSelect, playCelebrate };
}
