import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import { text } from 'express';

dotenv.config();

const Pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

export const query = (text, params) => Pool.query(text, params);