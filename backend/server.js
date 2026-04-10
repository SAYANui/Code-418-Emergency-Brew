const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
// Google Cloud Run natively provides the PORT environment variable (usually 8080)
const PORT = process.env.PORT || 8080;

app.use(cors());

// Serve the static files from the built React app
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// The joke endpoint
app.get('/brew', (req, res) => {
    res.status(418).json({
        error: "I'm a teapot",
        message: "Refusing to brew coffee because I am, in fact, a teapot."
    });
});

app.get('/api/status', (req, res) => {
    res.json({ status: "ok", mode: "stable" });
});

// Any unmatched routes should fall back to the React app so React Router works
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`☕ EMERGENCY BREW SERVER LISTENING ON PORT ${PORT} ☕`);
});
