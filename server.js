const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Request logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} request for: ${req.url}`);
    next();
});

// Serve static files from the root directory (this covers index.html, approvals.html, etc., and the css/ js/ folders)
app.use(express.static(path.join(__dirname)));

// Basic route for the root to explicitly serve index.html if requested without filename
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 404 Error Handling Middleware
app.use((req, res, next) => {
    console.log(`[404] Resource not found: ${req.url}`);
    res.status(404).send('<h2>404 - Page Not Found</h2><p>The requested resource could not be found.</p><a href="/">Go back to Dashboard</a>');
});

// Global Error Handling Middleware (500)
app.use((err, req, res, next) => {
    console.error(`[500] Server Error:`, err.stack);
    res.status(500).send('<h2>500 - Internal Server Error</h2><p>Something went wrong on the server.</p>');
});

app.listen(PORT, () => {
    console.log(`========================================`);
    console.log(`🚀 DocuPilot Server is running!`);
    console.log(`📡 Listening on port: ${PORT}`);
    console.log(`👉 Access the app at: http://localhost:${PORT}`);
    console.log(`========================================`);
});
