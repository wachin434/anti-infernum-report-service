import express from 'express';
import cors from 'cors';
import reportRoutes from './routes/report.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/reports', reportRoutes);

app.get('/', (req, res) => {
  res.send('API de Reportes de incendios');
});

module.exports = app;