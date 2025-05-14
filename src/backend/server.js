const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express');
const app = express();
const { Pool } = require('pg');


const { ArtisanRegistration, ClientRegistration, AdminRegistration } = require('./auth/registration.js');
const { ArtisanLogin, ClientLogin, AdminLogin } = require('./auth/login.js');
const dashboard = require('./dashboard/dashboard.js');

const frontendPort = 8000;
const port = 8080;

dotenv.config();
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT
});

app.use(cors({
    origin: `http://localhost:${frontendPort}`,
    methods: ['GET', 'POST'],
}));

app.use(express.json());

app.post('/api/auth/register/artisan', async (req, res) => {
    try {
        const { username, password, companyName, iban } = req.body;
        const reg = new ArtisanRegistration(pool, username, password, companyName, iban);
        await reg.register();
        res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
});

app.post('/api/auth/register/client', async (req, res) => {
    try {
        const { username, password, email, name, surname } = req.body;
        const reg = new ClientRegistration(pool, username, password, email, name, surname);
        await reg.register();
        res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
});

app.post('/api/auth/register/admin', async (req, res) => {
    try {
        const { username, password } = req.body;
        const reg = new AdminRegistration(pool, username, password);
        await reg.register();
        res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
});

app.post('/api/auth/login/artisan', async (req, res) => {
    try {
        const { username, password } = req.body;
        const l = new ArtisanLogin(pool, username, password);
        await l.authenticate();
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
});

app.post('/api/auth/login/client', async (req, res) => {
    try {
        const { username, password } = req.body;
        const l = new ClientLogin(pool, username, password);
        await l.authenticate();
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
});

app.post('/api/auth/login/admin', async (req, res) => {
    try {
        const { username, password } = req.body;
        const l = new AdminLogin(pool, username, password);
        await l.authenticate();
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
});

app.get('/api/artigiano/dashboard', async (req, res) => {
    try {
        const {artisan_name} = req.body;
        const d = new dashboard.Dashboard(pool, artisan_name);
        
        //TODO 
        //metodo per prendere tutti i prodotti

        res.json();

    } catch (error){
        console.error(error);
        res.status(400).json({message: 'Bad request', error: error.message})

    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
