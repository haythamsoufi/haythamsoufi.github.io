# Portfolio Website

A modern, single-page portfolio website with URL routing support.

## 🚀 Quick Start

### Option 1: Local Server (Recommended)

For the best experience with URL routing, use a local server:

```bash
# Using Node.js
node server.js

# Then open http://localhost:3000 in your browser
```

### Option 2: Python Server

```bash
# Python 3
python -m http.server 8000

# Then open http://localhost:8000 in your browser
```

### Option 3: VS Code Live Server

If you're using VS Code, install the "Live Server" extension and click "Go Live" in the status bar.

### Option 4: Direct File Access

You can also open `index.html` directly in your browser, but URL routing will use hash-based URLs (e.g., `file:///path/to/index.html#about`) instead of clean paths.

## 📁 Project Structure

```
portfolio/
├── index.html              # Main HTML file
├── styles/
│   └── main.css            # All styles
├── js/
│   ├── navigation.js       # Screen navigation & URL routing
│   ├── features.js         # Feature subscreen navigation
│   ├── animations.js       # Animations
│   ├── mockups.js          # Mockup modal
│   └── main.js             # Main initialization
├── partials/               # HTML partials/components
└── server.js               # Simple local development server
```

## 🔗 URL Routes

The website supports the following routes:

- `/` - Home
- `/project` - DataBank Project
- `/about` - About
- `/skills` - Skills
- `/projects` - Projects
- `/contact` - Contact

## 🛠️ Development

### Running Locally

1. Start the local server:
   ```bash
   node server.js
   ```

2. Open your browser to `http://localhost:3000`

3. Navigate between sections - URLs will update automatically!

### Features

- ✅ Modular CSS and JavaScript
- ✅ HTML partials for reusable components
- ✅ URL routing with browser history support
- ✅ Works with file:// protocol (hash-based routing)
- ✅ Works with http/https (clean URL routing)

## 📝 Notes

- When using `file://` protocol, URLs will use hash fragments (e.g., `#about`)
- When using a local server, URLs will use clean paths (e.g., `/about`)
- The server configuration files (`.htaccess`, `_redirects`, `vercel.json`) are included for deployment
