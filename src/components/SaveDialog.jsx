/**
 * components/SaveDialog.jsx
 *
 * Modal dialog for:
 *   - Saving drawing to Firebase (cloud)
 *   - Loading previous drawings
 *   - Downloading as PNG
 *   - Sharing via link
 */
import { useState, useEffect } from 'react';
import { useAuth }             from '../context/AuthContext.jsx';
import { useApp }              from '../context/AppContext.jsx';
import {
  saveDrawing, loadDrawings, shareDrawing,
} from '../firebase/drawingService.js';

export default function SaveDialog({ canvasRef, onClose }) {
  const { user, isConfigured } = useAuth();
  const { mode, letter }       = useApp();

  const [status,    setStatus]    = useState('');
  const [statusType,setStatusType]= useState(''); // 'success'|'error'
  const [saves,     setSaves]     = useState([]);
  const [shareUrl,  setShareUrl]  = useState('');
  const [loading,   setLoading]   = useState(false);

  useEffect(() => {
    if (user && isConfigured) {
      loadDrawings(user.uid).then(setSaves).catch(console.warn);
    }
  }, [user, isConfigured]);

  function getDataUrl() {
    return canvasRef?.current?.toDataURL('image/png') ?? null;
  }

  async function handleSaveCloud() {
    if (!user) { setStatus('Please sign in to save.'); setStatusType('error'); return; }
    if (!isConfigured) { setStatus('Firebase not configured.'); setStatusType('error'); return; }
    const dataUrl = getDataUrl();
    if (!dataUrl) return;
    setLoading(true);
    try {
      await saveDrawing(user.uid, dataUrl, {
        name: `Letter ${letter} – ${new Date().toLocaleDateString()}`,
        mode, letter,
      });
      setStatus('✅ Saved to cloud!'); setStatusType('success');
      const updated = await loadDrawings(user.uid);
      setSaves(updated);
    } catch (e) {
      setStatus(`❌ ${e.message}`); setStatusType('error');
    } finally { setLoading(false); }
  }

  function handleDownload() {
    const dataUrl = getDataUrl();
    if (!dataUrl) return;
    const a = document.createElement('a');
    a.href     = dataUrl;
    a.download = `kido-color-${letter}-${Date.now()}.png`;
    a.click();
    setStatus('📥 Downloaded!'); setStatusType('success');
  }

  async function handleShare(save) {
    if (!user || !isConfigured) return;
    setLoading(true);
    try {
      const url = await shareDrawing(user.uid, save.id);
      setShareUrl(url);
      setStatus('🔗 Share link ready!'); setStatusType('success');
    } catch (e) {
      setStatus(`❌ ${e.message}`); setStatusType('error');
    } finally { setLoading(false); }
  }

  function copyShareUrl() {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setStatus('📋 Link copied!'); setStatusType('success');
    });
  }

  return (
    <div className="dialog-backdrop" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="dialog-box" role="dialog" aria-modal="true" aria-label="Save artwork">
        <p className="dialog-title">💾 Save Artwork</p>

        <div className="dialog-row">
          <button className="btn-save-cloud"  onClick={handleSaveCloud}  disabled={loading}>
            {loading ? <span className="spinner"/> : '☁️ Save to Cloud'}
          </button>
          <button className="btn-download-dialog" onClick={handleDownload}>📥 Download PNG</button>
        </div>

        {shareUrl && (
          <div className="share-link-row">
            <input className="share-link-input" readOnly value={shareUrl} aria-label="Share link"/>
            <button className="btn-copy" onClick={copyShareUrl}>Copy</button>
          </div>
        )}

        {status && (
          <p className={`dialog-feedback ${statusType}`}>{status}</p>
        )}

        {saves.length > 0 && (
          <div className="dialog-saves-list">
            <h3>Previous Drawings</h3>
            {saves.slice(0, 8).map(s => (
              <div key={s.id} className="save-item">
                {s.imageUrl && <img src={s.imageUrl} alt="" loading="lazy"/>}
                <div className="save-item-info">
                  <div className="save-item-name">{s.name}</div>
                  <div className="save-item-date">{s.createdAt?.toDate?.()?.toLocaleDateString?.() ?? ''}</div>
                </div>
                <button style={{fontSize:'18px',background:'none'}} onClick={() => handleShare(s)} aria-label="Share">🔗</button>
              </div>
            ))}
          </div>
        )}

        <div className="dialog-row" style={{marginTop:14}}>
          <button className="btn-cancel" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
