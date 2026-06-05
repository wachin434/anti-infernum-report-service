import Report from '../models/report.model.js';

const getReports = async (req, res) => {
  try {
    const reports = await Report.getAll();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los reportes: ' + error.message });
  }
};

export const createReport = async (req, res) => {
  const { ubicacion, descripcion } = req.body;

  if (!ubicacion || !descripcion) {
    return res.status(400).json({ error: 'Ubicación y descripción son requeridas' });
  }

  try {
    const newReport = await Report.create(ubicacion, descripcion);
    res.status(201).json({ message: 'Reporte creado con éxito', data: newReport });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el reporte: ' + error.message });
  }
};
