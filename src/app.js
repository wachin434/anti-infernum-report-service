import express from 'express';
import { query } from './config/db';

const app = express();
const PORT = 3000;

app.get('/')