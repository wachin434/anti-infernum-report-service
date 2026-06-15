import express from 'express';
import cors from 'cors';
import enrutadorReportes from './routes/reporte.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', enrutadorReportes);

export default app;