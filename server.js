const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Add proper MIME types for JavaScript modules
express.static.mime.define({'application/javascript': ['js']});

// Serve static files from the current directory
app.use(express.static(__dirname, {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

// Specifically serve assets directory
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Handle client-side routing - serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Solymarket server running on http://localhost:${PORT}`);
  console.log(`📁 Serving files from: ${__dirname}`);
  console.log(`🔗 Open: http://localhost:${PORT}`);
});