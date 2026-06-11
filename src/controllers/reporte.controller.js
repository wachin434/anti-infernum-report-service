import { json } from 'express';
import Reporte from '../models/reporte.model.js';

export const createReporte = async (solicitud, respuesta) => {
  try {
    const { titulo, descripcion, latitud, longitud } = solicitud.body;

    const nuevoReporte = await Reporte.create({
      titulo,
      descripcion,
      ubicacion: {
        type: 'Point' ,
        coordinates: [parseFloat(longitud), parseFloat(latitud)]
      }
    });

    respuesta.status(201).json({ exito: true, datos: nuevoReporte });
  } catch( error ) {
    respuesta.status(500),json({ exito: false, mensaje: error.message });
  }
};

export const obtenerReportes = async (solicitud, respuesta) => {
  try {
    const reportes = await Reporte.findAll();
    respuesta.status(200).json({ exito: true, datos: reportes }); 
  }catch ( error ) {
    respuesta.status(500).json( {exito: false, mensaje: error.message });
  }
};