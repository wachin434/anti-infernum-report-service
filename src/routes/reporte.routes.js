import { Router } from 'express';
import { createReporte, obtenerReportes, actualizarReporte, eliminarReporte } from '../controllers/reporte.controller.js';

const enrutador = Router();

enrutador.post('/reportes', createReporte);
enrutador.get('/reportes', obtenerReportes);
enrutador.put('/reportes/:id', actualizarReporte);
enrutador.delete('/reportes/:id', eliminarReporte);

export default enrutador;