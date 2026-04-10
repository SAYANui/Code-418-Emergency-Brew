<div align="center">
  <h1>🚨 Code-418-Emergency-Brew 🚨</h1>
  <p><i>The ultimate April Fool's web prank that literally breaks your phone.</i></p>
  
  <p>
    <a href="#about">About</a> •
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#how-to-run">How To Run</a>
  </p>
</div>

---

## ☕ About The Project

Created for the **dev.to April Fool's Challenge**. 

What starts as a seemingly innocent website asking, *"Brew a coffee?"*, quickly spirals into an absolute nightmare for whoever clicks the button. Built around the legendary `HTTP 418 I'm a teapot` server status, this project unleashes a barrage of visual UI corruption, loud alarms, and an intentional performance "Lag Engine" to completely bog down the victim's device. 

## 😈 Features

- **The Setup:** A clean React UI asking the user to click to start. 
- **The Countdown:** A screen-shaking tension-builder to make the user panic.
- **Canvas GPU Bomb:** An invisible graphics loop forcing the device Graphics Processor to calculate thousands of overlapping transparent curves every single frame, dropping the phone to barely 5 FPS.
- **MediaSession Hijack:** Custom alarm audio that registers itself as a music player. If the user locks their phone in panic, **the alarm keeps playing from their locked screen**.
- **Tab Trap & Notifications:** `beforeunload` events try to prevent tabs from closing, while a Service Worker vibrates the phone demanding an immediate device restart.
- **The 418 API:** A fully functional Express backend that refuses to brew coffee because it is, in fact, a teapot.

## 🛠️ Tech Stack

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Styling:** Vanilla CSS (Keyframe animations)
- **Deployment Strategy:** Render.com (Containerized Node Service) / Vercel

## 🚀 How To Run Locally

> **⚠️ WARNING:** The Lag Engine is very effective. Test with caution.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SAYANui/Code-418-Emergency-Brew.git
   cd Code-418-Emergency-Brew
   ```

2. **Start the Backend:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   *(Running on http://localhost:8080)*

3. **Start the Frontend (in a new terminal):**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   *(Running on http://localhost:5173)*

4. Turn up your volume, open the frontend link, and click **"YES PLEASE"**.

---
*Disclaimer: No actual mobile phones were harmed in the making of this prank (though a few GPUs got slightly warm).*