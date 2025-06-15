const express = require('express');
const path = require('path');
const app = express();
const rateLimit = require('express-rate-limit');
const port = 8000;
const pagesPath = path.join(__dirname, './public/pages');
const publicPath = path.join(__dirname, './public');

const options = {
    extensions: ['html', ''],
    immutable: true,
    index: 'index.html'
};

/** Rate limiting middleware to prevente abuse */
const limiter = rateLimit({
    windowMs: 15 * 1000,
    max: 15*100, // Limit each IP to max requests per windowMs
});
app.use(limiter);

app.use(express.static(pagesPath, options));
app.use(express.static(publicPath, {immutable: true, index: false}));

app.listen(port, () => {
    console.log(`Frontend running at http://localhost:${port}/`);
});

app.get('/backend/url', (req, res) => {
    res.json({
        url: process.env.BACKEND_URL || 'http://localhost:8080'
    });
});
