const express = require('express');
const path = require('path');
const app = express();
const port = 8080;
const frontendPath = path.join(__dirname, '../frontend');

app.use(express.static(frontendPath));

// Routes

app.get('/', (req, res) => {
    res.sendFile(path.join(frontendPath, 'pages/index.html'));
});
app.get('/artigiano/dashboard', (req, res) => {
    res.sendFile(path.join(frontendPath, 'pages/artigiano/dashboard.html'));
});
app.get('/auth/login', (req, res) => {
    res.sendFile(path.join(frontendPath, 'pages/auth/login.html'));
});app.get('/auth/register', (req, res) => {
    res.sendFile(path.join(frontendPath, 'pages/auth/register.html'));
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});