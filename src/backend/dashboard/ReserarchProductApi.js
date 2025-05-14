// TODO: delete and implement API in server.js

const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express');
const path = require('path');
const app = express();
const { Pool } = require('pg');


const Research = require('./dasbord/researchProductClass.js');


const frontendPort = 8000;
const port = 8080;
const frontendPath = path.join(__dirname, '../frontend/pages');
const options = {
    extensions: ['html', ''],
    immutable: true,
    index: 'index.html'
};

dotenv.config();
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

app.use(cors({
    origin: `http://localhost:${frontendPort}`,
    methods: ['GET', 'POST'],
}));

app.use(express.json());


// All products
app.get('/api/ricerca/dashboard', async (req, res) => {
    try {
        const research = new ProductResearch(pool);
        const products = await research.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
});

// products by id
app.get('/api/ricerca/dashboard/:id', async (req, res) => {
    try {
        const research = new ProductResearch(pool, req.params.id);
        const product = await research.getProductById();
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
});

}

export { Research, IncompatiblyId };

