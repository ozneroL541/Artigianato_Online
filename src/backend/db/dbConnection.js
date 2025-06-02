import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Database configuration for PostgreSQL.
 * Reads configuration from environment variables.
 */
const dbConfig = {
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT
};

/**
 * PostgreSQL connection pool.
 */
const pool = new Pool(dbConfig);

export { pool }
