import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const conexionBaseDatos = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging:false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

export default conexionBaseDatos;