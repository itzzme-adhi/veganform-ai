# VeganForm AI — Production Deployment Guide

This document outlines the architecture, environment configuration, build verification, and deployment instructions for **VeganForm AI** (Computational Food R&D platform).

---

## 1. System Architecture Overview

VeganForm AI uses a unified Full-Stack architecture:
- **Client Frontend**: React 19 SPA built with Vite 8 and Tailwind CSS 4.
- **Server Backend**: Node.js Express server (`server.ts`) acting as an API gateway and reverse proxy.
- **AI Engine**: Google GenAI SDK (`@google/genai`) connecting to `gemini-2.5-flash` for molecular reasoning and functional substitution deconstruction.
- **Deterministic Calculation Engines**:
  - `nutritionEngine.ts` (nutritional density calculation based on standard ingredient database)
  - `costEngine.ts` (batch matrix cost calculation against reference ceilings)
  - `sustainabilityEngine.ts` (carbon footprint delta relative to animal precursor benchmarks)
  - `rankingEngine.ts` (Pareto multi-objective ranking based on user criteria weights)
  - `allergenValidator.ts` (strict zero-tolerance allergen constraint enforcement)
  - `deterministicFallback.ts` (fully offline/fallback demo engine when Gemini API is unavailable)

### Gemini API Security
- **The Gemini API key is NEVER exposed to the frontend or browser.**
- All Gemini API calls are strictly handled server-side within `server.ts` behind the `/api/formulate` route.
- The browser only sends formulation requests to `/api/formulate` on the same origin.
- The health check endpoint `/api/health` returns only a boolean flag (`hasGeminiKey: true/false`), never leaking credentials.

---

## 2. Environment Variables & Secret Management

All sensitive secrets are isolated on the server. The application uses `dotenv` to load environment variables locally and expects them in standard system environment variables when hosted in the cloud.

### Private Server-Side Secrets
| Variable | Required | Description | Example |
| :--- | :---: | :--- | :--- |
| `GEMINI_API_KEY` | Optional* | Google Gemini API key for AI synthesis. If omitted, the deterministic fallback engine runs automatically. | `AIzaSy...` |
| `PORT` | Optional | Port on which the Express server listens. Defaults to `3000`. Cloud hosts inject this automatically. | `8080` |
| `NODE_ENV` | Recommended | Application mode. Set to `production` for public hosting. | `production` |

*\*If `GEMINI_API_KEY` is not provided or fails, the application automatically runs its deterministic fallback mode so users always receive valid formulations without downtime or blank screens.*

### Public Client-Side Configuration
Any variables intended for the client bundle must be prefixed with `VITE_`.
Currently, the client communicates with the server via relative `/api/*` endpoints on the same origin, so **no client-side environment variables or secrets are required**.

### Where Secrets Must Be Stored
- **Local Development**: In a `.env` or `.env.local` file in the project root. (Ensure this file is never committed to Git; it is already in `.gitignore`.)
- **Cloud Hosting (Render, Railway, Cloud Run, AWS)**: Store `GEMINI_API_KEY` in the host's **Environment Variables / Secrets Management Console**. Never commit `.env` with actual keys to source control.

---

## 3. Local Installation & Development

### Prerequisites
- Node.js `v20+` or `v22+` (Node `v26` is also supported)
- npm `v10+` or `v11+`

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd VeganForm-AI---Computational-Food-R&D

# Install dependencies
npm install
```

### Local Development Run
```bash
# Start development server with hot module reloading
npm run dev
```
The server will start at `http://localhost:3000`.

---

## 4. Production Build

To build the client SPA for production:

```bash
npm run build
```

This compiles all React components, Tailwind styles, and static assets into the `dist/` directory.

To check TypeScript types without emitting files:
```bash
npm run lint
```

---

## 5. Recommended Production Deployment Architecture

Because VeganForm AI combines a static SPA with a Node.js Express API backend, the simplest and most robust deployment options are:

### Option A: Containerized Deployment (Google Cloud Run / AWS ECS / Render Docker) — **Recommended**
Deploy as a Docker container. The container runs `npm run build` during image creation and starts the server with `npm start`.

#### Dockerfile Example
```dockerfile
FROM node:22-alpine

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Build frontend static assets into dist/
RUN npm run build

# Expose port (Cloud Run defaults to 8080)
ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

# Start server
CMD ["npm", "start"]
```

### Option B: Cloud Platform as a Service (Render / Railway / Fly.io)
1. **Repository**: Connect your GitHub repository to Render or Railway.
2. **Environment**: Select **Node**.
3. **Build Command**: `npm install && npm run build`
4. **Start Command**: `npm start`
5. **Environment Variables**:
   - `GEMINI_API_KEY`: `<Your Google Gemini API Key>`
   - `NODE_ENV`: `production`

---

## 6. Exact Deployment Steps (Step-by-Step for Render / Cloud Run)

### Deploying to Render
1. Create a free account at [render.com](https://render.com).
2. Click **New +** -> **Web Service**.
3. Link your Git repository.
4. Fill in the service configuration:
   - **Name**: `veganform-ai`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. Click **Advanced** -> **Add Environment Variable**:
   - Key: `GEMINI_API_KEY`, Value: `[Your API Key]`
   - Key: `NODE_ENV`, Value: `production`
6. Click **Create Web Service**.
7. Once deployment finishes, Render provides your public URL (e.g. `https://veganform-ai.onrender.com`).

### Deploying to Google Cloud Run
1. Install and authenticate the Google Cloud SDK:
   ```bash
   gcloud auth login
   gcloud config set project [YOUR_PROJECT_ID]
   ```
2. Build and deploy container directly using Google Cloud Build:
   ```bash
   gcloud run deploy veganform-ai \
     --source . \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars NODE_ENV=production \
     --set-secrets GEMINI_API_KEY=gemini-key:latest
   ```
3. Cloud Run provides an HTTPS URL upon completion.

---

## 7. How to Test the Deployed Application

After deployment, perform these verification checks on the live URL:

### 1. Health Status Check
Send a `GET` request to `/api/health`:
```bash
curl https://<your-deployed-domain>/api/health
```
Expected response:
```json
{
  "status": "ok",
  "hasGeminiKey": true,
  "mode": "production"
}
```

### 2. Frontend Navigation & Assets
- Open `https://<your-deployed-domain>/` in your browser.
- Verify the dark biotech theme loads with fonts, icons, and ambient glows.
- Navigate across tabs: **Product** -> **Formulate** -> **Candidates** -> **Knowledge** -> **Demo**.
- Check DevTools Console (F12) to verify zero network 404s or console errors.

### 3. AI Formulation Synthesis
- On the **Formulate** tab, select or enter a target (e.g., `Chicken Nugget`).
- Add an allergen constraint: `No Soy`.
- Click **Synthesize Formulation Candidates**.
- Verify that 3 candidates are generated and displayed on the **Candidates** tab.
- Inspect the ingredients to verify that **NO SOY** ingredients are present in any candidate.

### 4. Deterministic Fallback Mode Check
- If `GEMINI_API_KEY` is omitted or invalid, verify that formulation generation still succeeds immediately via the internal fallback engine with the notification banner indicating demo mode.

### 5. Regulatory Disclaimers Verification
Confirm that all disclaimers are visibly present on candidate cards, lab specification sheets, and formulation outputs:
- *"AI-generated prototype. Results require physical laboratory validation before food production or commercial use."*
- *"AI-estimated"* on taste/texture similarity scores.
- *"Prototype estimate — not a lifecycle assessment"* on sustainability metrics.
