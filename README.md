# LUMINA &bull; Fine Art Photography Gallery & Exhibition Platform

> A modern, professional full-stack photography web application crafted with **Angular 18** (Standalone components, Signals, SCSS, Animations) and **Node.js / Express** REST API.

---

## 🌟 Key Highlights & Architecture

### Frontend (Angular 18)
- **Cinematic Luxury UI/UX**: Dark Obsidian palette with champagne gold (`#d4af37`), ice cyan (`#38bdf8`), and crimson accents, glassmorphic frosted containers, and responsive typography (`Cinzel`, `Playfair Display`, `Plus Jakarta Sans`, `JetBrains Mono`).
- **Interactive Hero Carousel**: Auto-advancing masterwork slideshow with ken-burns zoom animation, camera metadata badges, and live gallery stats ticker.
- **Dynamic Exhibition Gallery**:
  - Filter by Category pills: *All, Landscape, Portrait, Street, Architecture, Wildlife, Astrophotography, Cinematic, Drone*.
  - Search bar for keyword matching across photo title, camera body, lens, location, tags, and photographer.
  - Orientation filter: *Landscape (16:10), Portrait (4:5), Square (1:1)*.
  - Sort by: *Recently Added, Most Applauded, Most Viewed, Archive Chronological*.
  - Switch layout modes: *Dynamic Masonry Grid* vs *Cinematic Wide Strips*.
- **Full-featured Lightbox Modal**:
  - High-res photo presentation with zoom controls (1x, 1.5x, 2x, pan) and reset.
  - Keyboard navigation: `Left Arrow` (Previous), `Right Arrow` (Next), `Escape` (Close), `Spacebar` (Toggle auto slideshow).
  - Detailed camera EXIF panel: Camera model, lens mounted, focal length, aperture, shutter speed, ISO, native resolution, capture date.
  - Direct image download trigger and one-click link sharing with clipboard toast.
  - Interactive likes counter with floating heart particles.
  - Real-time artistic impressions / critique comments section with instant post.
- **Thematic Monographs / Albums**:
  - Curated multi-photo series (*"Nordic Whispers"*, *"Cyberpunk Nights: Tokyo"*, *"The Silent Cosmos"*, *"Chroma & Haute Couture"*).
- **Featured Artists & Visionaries**:
  - Photographer profiles, awards showcase, gear list, and exhibition statistics.
- **Client Endorsements & Patronage**:
  - Editorial testimonials from *Vogue Scandinavia*, *National Geographic Expeditions*, and *Architectural Digest*.
- **Upload Masterpiece Modal**:
  - Drag & drop local photo file upload (stored in `backend/uploads/` via Multer) or direct high-res image URL input.
  - Camera EXIF inputs and instant integration into the gallery.
- **Studio Commission & Booking Modal**:
  - Interactive service selection (*Haute Portrait, Commercial Campaign, Archival Fine Art Print, Expedition Commission*).
  - Price tier selector and automated inquiry dispatch to backend.
- **Toast Notification Engine**: Non-intrusive floating toasts for favorites, downloads, comments, and form submissions.

---

### Backend (Node.js & Express)
- REST API running on port `5000`.
- Multer storage for handling local high-resolution image uploads.
- Full CORS integration and static asset hosting.
- Built-in static production server: automatically serves the compiled Angular application (`dist/frontend/browser`) directly on `http://localhost:5000` with SPA routing support.

#### REST API Endpoints:
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/photos` | Query photos with filters (`category`, `search`, `orientation`, `sort`, `featured`) |
| `GET` | `/api/photos/:id` | Get single photo and increment view count |
| `POST` | `/api/photos/:id/like` | Toggle favorite / applause status |
| `POST` | `/api/photos/:id/comments` | Post a critique / comment |
| `POST` | `/api/photos` | Upload file (multipart) or create photo with image URL |
| `DELETE` | `/api/photos/:id` | Remove a photo from exhibition |
| `GET` | `/api/albums` | Get curated thematic photo series |
| `GET` | `/api/photographers` | Get master photographer profiles & awards |
| `GET` | `/api/testimonials` | Get client & patron reviews |
| `POST` | `/api/inquiries` | Submit photoshoot booking or fine art print acquisition |
| `GET` | `/api/stats` | Live counters for photos, applause, views, and categories |

---

## 🚀 How to Run

### Method 1: One-Click Desktop Launcher (Recommended)
Double-click `start-gallery.bat` in the project root:
1. It automatically sets the Node runtime path.
2. Starts the Node.js backend on `http://localhost:5000`.
3. Starts the Angular frontend on `http://localhost:4200` with proxy configured.
4. Opens your default web browser to `http://localhost:4200`.

### Method 2: Standalone Production Mode
Double-click `start-production.bat`:
- Launches the single server serving both the Angular frontend and API on `http://localhost:5000`.

### Method 3: Manual Terminal Commands

#### 1. Start the Backend:
```bash
cd backend
node server.js
```
*Backend runs on `http://localhost:5000`*

#### 2. Start the Frontend (Dev Server):
```bash
cd frontend
npm start
```
*Frontend runs on `http://localhost:4200`*

#### 3. Rebuild Frontend for Production:
```bash
cd frontend
npm run build
```
*Builds to `frontend/dist/frontend/browser`*

---

## 📁 Directory Structure
```
photo gelary/
├── start-gallery.bat        # One-click dev runner (Backend + Angular Frontend)
├── start-production.bat     # One-click production server (Port 5000)
├── package.json             # Root workspace scripts
├── README.md                # Documentation & API reference
├── backend/
│   ├── server.js            # Express server, REST endpoints & static serving
│   ├── photos.data.js       # Curated initial photography seed dataset
│   ├── package.json         # Backend dependencies (express, cors, multer)
│   ├── uploads/             # Destination for uploaded photos
│   └── node_modules/
└── frontend/
    ├── angular.json         # Angular 18 build & dev server proxy configuration
    ├── package.json         # Angular dependencies
    ├── proxy.conf.json      # API proxy (routes /api and /uploads to port 5000)
    ├── src/
    │   ├── index.html       # Web entrypoint with luxury typography
    │   ├── main.ts          # Angular application bootstrap
    │   ├── styles.scss      # Global design system, glassmorphism, keyframes
    │   └── app/
    │       ├── app.config.ts        # App providers (HttpClient, Animations)
    │       ├── app.component.ts     # Root coordinator
    │       ├── app.component.html   # Root layout template
    │       ├── app.component.scss
    │       ├── models/
    │       │   └── photo.model.ts   # TypeScript interfaces
    │       ├── services/
    │       │   ├── gallery.service.ts # HTTP communication & state
    │       │   └── toast.service.ts   # Interactive notification toasts
    │       └── components/
    │           ├── navbar/          # Sticky glass navigation & quick search
    │           ├── hero/            # Featured photo slider & ken-burns zoom
    │           ├── gallery/         # Category tabs, filter toolbar, masonry grid
    │           ├── lightbox/        # Fullscreen zoom, EXIF panel, slideshow
    │           ├── albums/          # Thematic photo monographs
    │           ├── photographers/   # Master artists & awards
    │           ├── testimonials/    # Patron & publication acclaim
    │           ├── upload-modal/    # Photo upload & EXIF specification
    │           ├── booking-modal/   # Commission inquiry & shoot booking
    │           ├── toast/           # Toast notification component
    │           └── footer/          # Editorial brand story & newsletter
```

