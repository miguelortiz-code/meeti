import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import path from 'path';
import { authRoutes } from './routes/index.routes.js';
import db from './config/db.js';

const app = express();

const startServer = async () => {
  try {
    // Validar variables de entorno necesarias
    if (!process.env.PORT || !process.env.URL_BACK) {
      throw new Error('Faltan variables de entorno: PORT o URL_BACK');
    }

    // Conectar a la base de datos
    await db.authenticate();
    // Sincroniza modelos con la base de datos
    await db.sync({ force: true });
    console.log('✅ Modelos sincronizados con la base de datos.');

    // Habilitar EJS como Template Engine
    app.set('view engine', 'ejs');
    app.use(expressEjsLayouts);
    app.set('views', path.join('src/views'));

    // Archivos estáticos
    app.use(express.static('src/public'));

    // Routing
    app.use('/auth', authRoutes);

    // Arrancar el servidor
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Servidor corriendo en: ${process.env.URL_BACK}:${process.env.PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error.message);
    process.exit(1);
  }
};

startServer();