import pool from '../config/db.js';

const Report = {
    getAll: async () => {
    const query = 'SELECT * FROM reportes ORDER BY fecha DESC';
    const { rows } = await pool.query(query);   
    return rows;
},

create: async (ubicacion, descripcion) => {
    const query = 'INSERT INTO reportes (ubicacion, descripcion) VALUES ($1, $2) RETURNING *';
    const values = [ubicacion, descripcion];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }
};

export default Report;  