import { exit } from 'node:process';
import dotenv from 'dotenv';
dotenv.config();

import { Users, Categories } from '../models/index.model.js';
import categories from './categories.seeder.js';
import users from './users.seeder.js';
import db from '../config/db.js';

// Importar datos
const importData = async () => {
  try {
    await db.authenticate(); // ✅ así se conecta Sequelize
    console.log('🔌 Conexión establecida con la base de datos.');

    await Promise.all([
      Categories.bulkCreate(categories),
      Users.bulkCreate(users),
    ]);

    console.log('✅ Datos importados correctamente');
    await db.close(); // ✅ cerrar conexión
    exit();
  } catch (error) {
    console.error('❌ Error al importar datos:', error.message);
    await db.close();
    exit(1);
  }
};

// Eliminar datos
const deleteData = async () => {
  try {
    await db.authenticate();
    console.log('🔌 Conexión establecida con la base de datos.');

    // Eliminar en orden correcto (según relaciones FK)
    await Promise.all([
      Users.destroy({ where: {}, truncate: true, cascade: true, restartIdentity: true }),
      Categories.destroy({ where: {}, truncate: true, cascade: true, restartIdentity: true }),
    ]);

    console.log('✅ Datos eliminados correctamente');
    await db.close();
    exit();
  } catch (error) {
    console.error('❌ Error al eliminar datos:', error.message);
    await db.close();
    exit(1);
  }
};

// Ejecutar según argumento
const action = process.argv[2];
if (action === '-i') importData();
else if (action === '-d') deleteData();
else {
  console.log('Usa: node seeder.js -i para importar o -d para eliminar');
  exit();
}