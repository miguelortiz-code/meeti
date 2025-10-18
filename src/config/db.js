import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

// Crear la instancia de conexión
const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_SERVER,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: false // opcional: desactiva logs de SQL en consola
  }
);

// Probar la conexión
try {
  await db.authenticate();
  console.log(`✅ Conexión exitosa a la base de datos: ${process.env.DB_NAME}`);
} catch (error) {
  console.error('❌ Error al conectar con la base de datos:', error);
}

export default db;