# 🎨 Kido Color

A fun, kid-friendly web application for children aged **3–6** featuring coloring, tracing, and free drawing — built with **React + Vite**, deployable to GitHub Pages as a static site.

---

## ✨ Features

| Mode | What kids can do |
|------|-----------------|
| 🖍️ **Color** | Color A–Z real illustrations (Animals, Vehicles, Nature) with bucket fill & paint tools |
| ✏️ **Trace** | Trace letters in 3 styles: Dotted, Arrows, Faint. Star + confetti on completion! |
| 🎨 **Draw** | Blank canvas free-drawing with all tools |

### Drawing tools
Pencil · Sketch Pen · Crayon (textured) · Watercolor (bleed gradients) · Poster Color · Oil Paint · Bucket Fill · Eraser

### Cloud features (requires Firebase setup)
- 🔐 **Google Sign-In** via Firebase Authentication
- ☁️ **Save drawings** to Firebase Storage + Firestore
- 📂 **Load previous artwork** from your account
- 🔗 **Share drawings** via public link

### UX highlights
- Bright, colorful, large-button UI designed for tablets and touchscreens
- Fully touch-friendly (`touch-action: none`)
- Responsive layout (mobile / tablet / desktop)
- Undo / Redo (25-step stack), Clear, Download as PNG
- Sound feedback via Web Audio API (no audio files)
- Confetti celebration on tracing completion
- Works **offline** without Firebase (all drawing features enabled)

---

## 📁 Folder Structure

```
kido-color/
├── index.html                  ← Vite app entry point
├── vite.config.js              ← Vite config (base path, code-splitting)
├── package.json
├── .env.example                ← Firebase config template
├── .github/
│   └── workflows/deploy.yml   ← Auto-deploy to GitHub Pages on push
├── src/
│   ├── main.jsx                ← React root
│   ├── App.jsx                 ← Shell + mode router
│   ├── context/
│   │   ├── AppContext.jsx      ← Global state (mode, tool, colour, letter…)
│   │   └── AuthContext.jsx     ← Firebase auth state
│   ├── components/
│   │   ├── Header.jsx          ← Nav bar + auth button
│   │   ├── Home.jsx            ← Landing screen with mode cards
│   │   ├── ColoringMode.jsx    ← SVG illustration coloring
│   │   ├── TracingMode.jsx     ← Letter tracing with completion detection
│   │   ├── FreeDrawMode.jsx    ← Free drawing canvas
│   │   ├── ToolPanel.jsx       ← Slide-in tool/size/colour panel
│   │   ├── ColorPalette.jsx    ← 24-swatch palette + custom picker
│   │   ├── ActionBar.jsx       ← Undo / Redo / Clear / Save / Download
│   │   ├── AuthButton.jsx      ← Google Sign-In / out
│   │   ├── SaveDialog.jsx      ← Cloud save, load, share
│   │   └── Confetti.jsx        ← Celebration animation
│   ├── hooks/
│   │   └── useDrawing.js       ← Drawing engine (tools, flood-fill, undo/redo)
│   ├── firebase/
│   │   ├── config.js           ← Firebase init (env-var driven)
│   │   ├── authService.js      ← Google sign-in helpers
│   │   └── drawingService.js   ← Save / load / share drawings
│   ├── data/
│   │   ├── coloringImages.js   ← 26 A–Z SVG outline illustrations
│   │   └── palette.js          ← Colour swatches
│   └── styles/
│       └── main.css            ← All styles + animations
└── archive/                    ← Original vanilla JS version (reference)
```

---

## 🚀 Deploy to GitHub Pages (Automatic)

The included GitHub Actions workflow builds the app and deploys it to the `gh-pages` branch automatically on every push to `main`.

**One-time setup:**

1. Go to your repo → **Settings → Pages**
2. Under *Source*, select **Deploy from a branch** → `gh-pages` → `/` (root)
3. *(Optional)* Add Firebase secrets for cloud save (see below)
4. Push to `main` — the workflow handles the rest

Your app will be live at `https://<your-username>.github.io/kido-color/`

---

## 🛠️ Running Locally

```bash
# 1. Install dependencies
npm install

# 2. (Optional) Set up Firebase config
cp .env.example .env.local
# Edit .env.local with your Firebase credentials

# 3. Start development server
npm run dev
# → http://localhost:5173/kido-color/

# 4. Build for production
npm run build

# 5. Preview production build
npm run preview
```

---

## 🔐 Firebase Setup (Optional — for cloud save)

The app works fully offline without Firebase. To enable Google Sign-In and cloud drawing save:

### Step 1 — Create a Firebase project

1. Go to [Firebase Console](https://console.firebase.google.com) → **Add project**
2. Enter a project name (e.g. `kido-color`) → Continue → Create project

### Step 2 — Enable Google Sign-In

1. In your project, go to **Build → Authentication → Sign-in method**
2. Click **Google** → Enable → enter a support email → **Save**
3. Under **Settings → Authorized domains**, add:
   - `localhost` (for local dev — usually already there)
   - `<your-username>.github.io` (for GitHub Pages deployment)

> ⚠️ Forgetting to add your GitHub Pages domain is the most common reason sign-in fails after deployment.

### Step 3 — Create Firestore Database

1. Go to **Build → Firestore Database → Create database**
2. Choose **Start in test mode** for development (add security rules before going public)
3. Pick a region close to your users

### Step 4 — Enable Storage

1. Go to **Build → Storage → Get started**
2. Accept the default rules, choose the same region as Firestore

### Step 5 — Get your web app config

1. Go to **Project Settings (⚙️)** → **Your apps** → **Add app** → Web (`</>`)
2. Register the app, then copy the `firebaseConfig` object values

### Step 6 — Configure the app

**For local development:**
```bash
cp .env.example .env.local
# Fill in all VITE_FIREBASE_* values from the config object above
npm run dev
```

**For GitHub Pages deployment (GitHub Actions):**

1. Go to your repo → **Settings → Secrets and variables → Actions**
2. Add each variable as a **Repository secret**:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`

### Firestore Security Rules (recommended for production)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid}/drawings/{drawingId} {
      allow read, write: if request.auth.uid == uid;
    }
    match /shared/{drawingId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Debugging sign-in issues

Open the app in **development mode** (`npm run dev`) — a small debug panel in the bottom-left corner shows which `VITE_FIREBASE_*` environment variables are set. All six must show ✓ for sign-in to work.

Common failure modes:
| Symptom | Likely cause |
|---------|-------------|
| Sign-in button does nothing | Popup blocked → app falls back to redirect (page reloads) |
| Error: "auth/unauthorized-domain" | GitHub Pages domain not added to Authorized domains |
| Error: "auth/invalid-api-key" | Wrong or missing `VITE_FIREBASE_API_KEY` |
| Sign-in works locally but not on GitHub Pages | Secrets not added to Actions, or domain not authorized |


---

## 🔮 Future Improvements

- More SVG illustration sets (Cartoons, Foods, Sports)
- Background music toggle with kid-friendly tunes
- Print button for physical coloring sheets
- Animated mascot character for encouragement
- Multi-language support
- Classroom mode (teacher dashboard)
