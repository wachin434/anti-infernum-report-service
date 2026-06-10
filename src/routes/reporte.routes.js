import { Router } from 'express';
import { createReporte, obtenerReportes } from '../controllers/reporte.controller.js';

const enrutador = Router();

enrutador.post('/reportes', createReporte);
enrutador.get('/reportes', obtenerReportes);

export default enrutador;