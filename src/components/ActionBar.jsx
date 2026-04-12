/**
 * components/ActionBar.jsx
 * Bottom bar with Tools, Undo, Redo, Clear, Save, Download.
 */
export default function ActionBar({ onUndo, onRedo, onClear, onSave, onDownload, clearLabel = 'Clear' }) {
  return (
    <div className="action-bar" role="toolbar">
      <button className="action-btn btn-undo"     onClick={onUndo}     aria-label="Undo">↩️ Undo</button>
      <button className="action-btn btn-redo"     onClick={onRedo}     aria-label="Redo">↪️ Redo</button>
      <button className="action-btn btn-clear"    onClick={onClear}    aria-label={clearLabel}>🗑️ {clearLabel}</button>
      {onSave     && <button className="action-btn btn-save"     onClick={onSave}     aria-label="Save">💾 Save</button>}
      {onDownload && <button className="action-btn btn-download" onClick={onDownload} aria-label="Download">📥 Download</button>}
    </div>
  );
}
