const express = require('express');
const path = require('path');
const app = express();
const rateLimit = require('express-rate-limit');
const { createProxyMiddleware } = require('http-proxy-middleware');
const pagesPath = path.join(__dirname, './public/pages');
const publicPath = path.join(__dirname, './public');
const port = process.env.PORT || 8000;

const options = {
    extensions: ['html', ''],
    immutable: true,
    index: 'index.html'
};

/** Rate limiting middleware to prevente abuse */
const limiter = rateLimit({
    windowMs: 15 * 1000, // 15 seconds
    max: 15*100, // Limit each IP to max requests per windowMs
});
//app.use(limiter);

const backendUrl = process.env.BACKEND_URL || 'http://localhost:8080';

// Proxy middleware for /api/* requests
app.use('/api', createProxyMiddleware({
    target: backendUrl,
    changeOrigin: true,
    pathRewrite: {
        '^/api': '/api' // Keep the /api prefix when forwarding
    },
    onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.status(500).json({ error: 'Proxy error occurred' });
    }
}));

app.use(express.static(pagesPath, options));
app.use(express.static(publicPath, {immutable: true, index: false}));

app.listen(port, () => {
    console.log(`Frontend running at http://localhost:${port}/`);
});
