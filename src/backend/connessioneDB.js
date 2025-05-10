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



//const express = require('express');
/*
import pg from 'pg';
const { Pool, Client } = pg;
 
const pool = new Pool({
    host: "localhost",
    port: "5432",
    user: "artigianato_online",
    password: "password",
    database: "artigianato_online_db"
});
 
console.log(await pool.query('SELECT * FROM clienti'));
*/

require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({ connectionString: process.env.PG_URI });

// GET all users
app.get('/users', async (req, res) => {
    //const { rows } = await pool.query('SELECT * FROM users');
    //res.json(rows);
    console.log('culo');
});

app.listen(5000, () => console.log("PostgreSQL API running on http://localhost:5000"));



