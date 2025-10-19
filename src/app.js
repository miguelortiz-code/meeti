import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import path, { dirname, join } from 'path';
import flash from 'connect-flash';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { authRoutes } from './routes/index.routes.js';
import {flashMiddleware} from './middleware/index.middleware.js'
import db from './config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const startServer = async () => {
  try {
    if (!process.env.PORT || !process.env.URL_BACK) {
      throw new Error('Faltan variables de entorno: PORT o URL_BACK');
    }

    // Conectar DB
    await db.authenticate();
    await db.sync(); // evita borrar tablas
    console.log('✅ Conexión y sincronización con la base de datos completa.');

    // Middlewares base
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(session({
      secret: process.env.SECRET,
      key: process.env.KEY,
      resave: false,
      saveUninitialized: false
    }));

    app.use(flash());
    app.use(flashMiddleware);


    // EJS
    app.set('view engine', 'ejs');
    app.use(expressEjsLayouts);
    app.set('views', join(__dirname, 'src/views'));

    // Archivos estáticos
    app.use(express.static(join(__dirname, 'src/public')));

    // Rutas
    app.use('/auth', authRoutes);

    // Servidor
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Servidor corriendo en: ${process.env.URL_BACK}:${process.env.PORT}`);
    });

  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error.message);
    process.exit(1);
  }
};

startServer();