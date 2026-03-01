# Simple Chat App

A minimal, no-login-required chat application built with Firebase and hosted on GitHub Pages.

## Features
- No login required
- Real-time messaging
- Anonymous users
- Mobile responsive

## Setup Instructions

### 1. Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" (or add to existing)
3. Register a web app (</> icon)
4. Copy your Firebase config
5. Enable Firestore Database:
   - Go to Firestore Database
   - Click "Create database"
   - Start in test mode
   - Choose a location

### 2. Update Firebase Config
Replace the `firebaseConfig` object in `script.js` with your own config values.

### 3. Deploy to GitHub Pages
1. Create a new repository on GitHub
2. Upload all files (index.html, style.css, script.js)
3. Go to Settings > Pages
4. Select "main" branch as source
5. Your app will be live at `https://[username].github.io/[repo-name]`
