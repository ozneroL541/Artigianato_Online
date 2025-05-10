/*
require('dotenv').config();
const express = require('express');
const {Pool} = require('pg');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({connectionString: process.env.PG_URI});

// GET all users
app.get('/users', async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM users');
    res.json(rows);
});

app.listen(5000, () => console.log("PostgreSQL API running on http://localhost:5000"));
*/
