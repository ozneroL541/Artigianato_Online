const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express');
const path = require('path');
const app = express();
const { Pool } = require('pg');


const Research = require('./dasbord/reserchProductClass.js');


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

export default pool;

class IncompatiblyId extends Error {
    constructor(message) {
        super(message);
        this.name = 'IncompatiblyId';
    }
}

class Research {
    static dbTableName = 'prodotti'; 
    static dbId_Products = 'id_prodotto';

    constructor(db, idProduct) {
        this.db = db;
        this.IdProduct = idProduct;
    }

    async ResearchById() {
        const query = `SELECT * FROM ${this.constructor.dbTableName} WHERE ${this.constructor.dbId_Products} = $1`;
        const values = [this.IdProduct];
        const res = await this.db.query(query, values);
        if (res.rows.length === 0) {
            throw new IncompatiblyId("Id of the product is invalid");
        }
        return res.rows[0];
    }

    static async ResearchProduct(db) {
        const query = `SELECT * FROM ${this.dbTableName}`;
        try {
            const res = await db.query(query);
            return res.rows;
        } catch (err) {
            console.error('Failed to retrieve products:', err);
            throw new Error('Could not fetch products from the database');
        }
    }
}

export { Research, IncompatiblyId };

