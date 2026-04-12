# 🎨 Kido Color

A fun, kid-friendly web application for children aged **3–6** featuring coloring, tracing, and free drawing — all powered by HTML5 Canvas and vanilla JavaScript. Zero build step; runs as a static site.

---

## ✨ Features

| Mode | What kids can do |
|------|-----------------|
| 🖍️ **Color** | Color A–Z alphabet letters. 3 themes: Animals, Objects, Fruits |
| ✏️ **Trace** | Trace letters in 3 styles: Dotted, Arrows, Faint. Star celebration on completion! |
| 🎨 **Draw** | Blank canvas free-drawing with all tools |

### Drawing tools
Pencil · Sketch Pen · Crayon · Watercolor · Poster Color · Oil Paint · Bucket Fill · Eraser

### UX highlights
- Bright, colorful, large-button UI designed for tablets and touchscreens  
- Fully touch-friendly (`touch-action: none`, passive-event handling)  
- Responsive layout (mobile / tablet / desktop)  
- Undo (up to 20 steps), Clear, Save-as-PNG  
- Sound feedback via Web Audio API (no audio files)  
- Confetti celebration when tracing is complete  
- Zero npm dependencies — just open `index.html`

---

## 📁 Folder Structure

```
kido-color/
├── index.html          ← Single-page app entry point
├── styles/
│   └── main.css        ← All styles + animations
├── scripts/
│   ├── drawing.js      ← Drawing engine (all tools, undo, flood-fill)
│   ├── coloring.js     ← A–Z coloring mode (3 themes)
│   ├── tracing.js      ← A–Z tracing mode (3 styles + coverage detection)
│   └── app.js          ← Navigation, tool panel, palette, event wiring
└── assets/             ← Reserved for future images / sounds
```

---

## 🚀 Deploy to GitHub Pages

1. Push this repository to GitHub (or fork it).
2. Go to **Settings → Pages**.
3. Under *Source*, choose **Deploy from a branch** and select `main` (root `/`).
4. Click **Save**. GitHub Pages will publish the site at  
   `https://<your-username>.github.io/kido-color/`

> **Tip:** if you rename the repo, update the URL accordingly.

---

## 🛠️ Running Locally

No build tools needed — just serve the files:

```bash
# Python 3
python -m http.server 8080
# then open http://localhost:8080

# Node.js (npx)
npx serve .
```

Or simply open `index.html` directly in any modern browser.

---

## 🔮 Future Improvements

- Add hand-drawn SVG letter shapes for a true coloring-book look  
- Background music toggle with kid-friendly tunes  
- Progress persistence with `localStorage`  
- Print button for physical coloring sheets  
- More themes: Vehicles, Foods, Sports  
- Animated mascot character for encouragement
