import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import { home } from './routes/index.routes.js';
import { connection, db } from './config/db.js';
import {Users} from './models/index.model.js';

const app = express();

const startApp = async () => {
  try {
    // primero conecta
    await connection();

    // ahora registra los modelos y sincroniza
    await db.sync({ alter: true });
    console.log("✅ Tablas sincronizadas");

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