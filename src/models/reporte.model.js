import { DataTypes } from 'sequelize';
import conexionBaseDatos from '../config/db.js';

const Reporte = conexionBaseDatos.define('Reporte', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT
  },
  ubicacion: {
    type: DataTypes.GEOMETRY('POINT', 4326),
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('activo','controlado','apagado'),
    defaultValue: 'activo'
  }
}, {
  timestamps: true
});

export default Reporte;