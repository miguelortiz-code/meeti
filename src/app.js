import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import dotenv from 'dotenv';
import path from 'path'
import {authRoutes} from './routes/index.routes.js';

dotenv.config({ path: '.env' });

const app = express();

try {
    // Validar variables de entorno necesarias
    if (!process.env.PORT || !process.env.URL_BACK) {
        throw new Error('Faltan variables de entorno: PORT o URL_BACK');
    }

    // Habilitar EJS como Template Engine
    app.set('view engine', 'ejs');
    // Ubicación de las vistas
    app.use(expressEjsLayouts);
    app.set('views', path.join('src/views'));

    // Archivos estaticos
    app.use(express.static('src/public'))

    // Routing
    app.use('/auth', authRoutes);












    // Arrancar el servidor
    app.listen(process.env.PORT, () => {
        console.log(`✅ Servidor corriendo en la URL: ${process.env.URL_BACK}:${process.env.PORT}`);
    });
} catch (error) {
    console.error('❌ Error al iniciar el servidor:', error.message);
    process.exit(1); // Cierra la app si ocurre un error crítico
}