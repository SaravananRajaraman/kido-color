/**
 * components/ActionBar.jsx
 * Bottom bar with Tools, Undo, Redo, Clear, Save, Download.
 */
import useAudio from '../hooks/useAudio.js';

export default function ActionBar({ onUndo, onRedo, onClear, onSave, onDownload, clearLabel = 'Clear' }) {
  const { playClick } = useAudio();

  function withClick(fn) {
    return fn ? () => { playClick(); fn(); } : fn;
  }

  return (
    <div className="action-bar" role="toolbar">
      <button className="action-btn btn-undo"     onClick={withClick(onUndo)}     aria-label="Undo">↩️ Undo</button>
      <button className="action-btn btn-redo"     onClick={withClick(onRedo)}     aria-label="Redo">↪️ Redo</button>
      <button className="action-btn btn-clear"    onClick={withClick(onClear)}    aria-label={clearLabel}>🗑️ {clearLabel}</button>
      {onSave     && <button className="action-btn btn-save"     onClick={withClick(onSave)}     aria-label="Save">💾 Save</button>}
      {onDownload && <button className="action-btn btn-download" onClick={withClick(onDownload)} aria-label="Download">📥 Download</button>}
    </div>
  );
}
