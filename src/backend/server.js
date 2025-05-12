const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express');
const path = require('path');
const app = express();
const port = 8080;
const frontendPath = path.join(__dirname, '../frontend/pages');
const options = {
    extensions: ['html', ''],
    immutable: true,
    index: 'index.html'
};
const { Pool } = require('pg');
const registration = require('./registration.js');
dotenv.config();
const poolOptions = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
};
const pool = new Pool(poolOptions);
app.use(cors());
app.use(express.json());
app.use(express.static(frontendPath, options));
app.use(express.static(path.join(__dirname, '../frontend')));

app.post('/api/auth/register/artisan', async (req, res) => {
    try {
        const { username, password, companyName, iban } = req.body;
        const reg = new registration.ArtisanRegistration(pool, username, password, companyName, iban);
        await reg.register();
        res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
});

app.post('/api/auth/register/client', async (req, res) => {
    try {
        const { username, password, email, name, surname } = req.body;
        const reg = new registration.ClientRegistration(pool, username, password, email, name, surname);
        await reg.register();
        res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
});

app.post('/api/auth/register/admin', async (req, res) => {
    try {
        const { username, password } = req.body;
        const reg = new registration.AdminRegistration(pool, username, password);
        await reg.register();
        res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
