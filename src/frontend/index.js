const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const rateLimit = require('express-rate-limit');
const pagesPath = path.join(__dirname, './public/pages');
const publicPath = path.join(__dirname, './public');
const port = process.env.PORT || 8000;

const options = {
    extensions: ['html', ''],
    immutable: true,
    index: 'index.html'
};

/** Rate limiting middleware to prevent abuse */
const limiter = rateLimit({
    windowMs: 15 * 1000, // 15 seconds
    max: 15*100, // Limit each IP to max requests per windowMs
});
//app.use(limiter);

const backendUrl = process.env.BACKEND_URL || 'http://localhost:8080';

// API proxy middleware - forward all /api/* requests to backend
// This must come BEFORE static file middleware
app.use('/api', createProxyMiddleware({
    target: backendUrl,
    changeOrigin: true,
    secure: false,
    logLevel: 'debug',
    // Since we're using app.use('/api', ...), Express strips /api from req.url
    // We need to add it back for the backend
    pathRewrite: {
        '^/': '/api/', // Rewrite the path to add /api back
    },
    onError: (err, req, res) => {
        console.error('Proxy Error:', err.message);
        console.error('Target URL:', backendUrl);
        console.error('Original URL:', req.originalUrl);
        console.error('Request URL:', req.url);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Proxy error occurred' });
        }
    }
}));

app.use(express.static(pagesPath, options));
app.use(express.static(publicPath, {immutable: true, index: false}));

app.listen(port, () => {
    console.log(`Frontend running at http://localhost:${port}/`);
});
