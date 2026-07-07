import { json } from 'express';
import Reporte from '../models/reporte.model.js';

export const createReporte = async (solicitud, respuesta) => {
  try {
    const { titulo, descripcion, latitud, longitud } = solicitud.body;

    if (!titulo || latitud === undefined || longitud === undefined) {
      return respuesta.status(500).json({ exito: false, mensaje: "Faltan campos obligatorios" });
    }

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
    respuesta.status(500).json({ exito: false, mensaje: error.message });
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

  export const actualizarReporte = async (solicitud, respuesta) => {
  try {
    const { id } = solicitud.params;
    const { titulo, descripcion, latitud, longitud } = solicitud.body;

    const reporte = await Reporte.findByPk(id);
    if (!reporte) {
      return respuesta.status(404).json({ exito: false, mensaje: "Reporte no encontrado" });
    }

    const datosActualizados = {};
    if (titulo !== undefined) datosActualizados.titulo = titulo;
    if (descripcion !== undefined) datosActualizados.descripcion = descripcion;
    
      if (latitud !== undefined || longitud !== undefined) {
      const lat = latitud !== undefined ? latitud : reporte.ubicacion.coordinates[1];
      const lng = longitud !== undefined ? longitud : reporte.ubicacion.coordinates[0];
      datosActualizados.ubicacion = {
        type: 'Point',
        coordinates: [parseFloat(lng), parseFloat(lat)]
      };
    }

    await reporte.update(datosActualizados);
    respuesta.status(200).json({ exito: true, datos: reporte });
  } catch (error) {
    respuesta.status(500).json({ exito: false, mensaje: error.message });
  }
};

  export const eliminarReporte = async (solicitud, respuesta) => {
    try {
      const { id } = solicitud.params;
      const reporte = await Reporte.findByPk(id);

      if (!reporte) {
        return respuesta.status(404).json({ exito: false, mensaje: "Reporte no encontrado" });
      }

      await reporte.destroy();
      respuesta.status(200).json({ exito: true, mensaje: "Reporte eliminado correctamente" });
    } catch (error) {
      respuesta.status(500).json({ exito: false, mensaje: error.message });
    }
  };