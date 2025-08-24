import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';
import { home } from './routes/index.routes.js';
import { connection, db } from './config/db.js';
import {Users} from './models/index.model.js';
import session from 'express-session';

const app = express();


const startApp = async () => {
  try {    
    // primero conecta
    await connection();

    // ahora registra los modelos y sincroniza
    await db.sync({ alter: true });
    console.log("✅ Tablas sincronizadas");
    
    // Habilitar lectura de datos de formularios
    app.use(express.urlencoded({extended: true}));
    
    // Habilitar cookie Parser
    app.use(cookieParser());
    
    // Crear la sesion
    app.use(session({
      secret: process.env.SECRET,
      key: process.env.KEY,
      resave: false,
      saveUninitialized: false
    }));

    // Agregando FLASH
    app.use(flash());

    // Habilitar EJS como template engine
    app.use(expressEjsLayouts);
    app.set('view engine', 'ejs');
    app.set('views', 'src/views');

    // Routing
    app.use('/', home);

    // Habilitando archivos estáticos
    app.use(express.static('src/public'));

    // Arrancando servidor
    app.listen(process.env.backend_port, () => {
      console.log(`🚀 Arrancando aplicación desde el puerto: ${process.env.backend_port}`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar la aplicación:", error);
    process.exit(1); // Detiene la app si algo crítico falla
  }
};

// Inicia la app
startApp();