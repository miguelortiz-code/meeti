import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import flash from 'connect-flash';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { authRoutes, dashboardRoutes,groupsRoutes,meetiRoutes,profileRoutes, homeRoutes} from './routes/index.routes.js';
import { flashMiddleware } from './middleware/index.middleware.js';
import db from './config/db.js';
import passport from './config/passport.js';

const app = express();

const startServer = async () => {
  try {
    if (!process.env.PORT || !process.env.URL_BACK) {
      throw new Error('Faltan variables de entorno: PORT o URL_BACK');
    }

    // =========================
    // Base de datos
    // =========================
    await db.authenticate();
    await db.sync({ alter: true });
    console.log('✅ Conexión y sincronización con la base de datos completa.');

    // =========================
    // Middlewares base
    // =========================
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    // =========================
    // Archivos estáticos (PRIMERO)
    // =========================
    app.use(express.static('src/public'));

    // =========================
    // Sesión
    // =========================
    app.use(
      session({
        secret: process.env.SECRET,
        key: process.env.KEY,
        resave: false,
        saveUninitialized: false
      })
    );

    // =========================
    // Passport
    // =========================
    app.use(passport.initialize());
    app.use(passport.session());

    // =========================
    // Flash messages
    // =========================
    app.use(flash());
    app.use(flashMiddleware);

    // =========================
    // EJS + Layouts
    // =========================
    app.set('view engine', 'ejs');
    app.set('views', 'src/views');
    app.use(expressEjsLayouts);

    // =========================
    // Rutas
    // =========================
    app.use('/auth', authRoutes);
    app.use('/', dashboardRoutes);
    app.use('/groups', groupsRoutes);
    app.use('/meeties', meetiRoutes);
    app.use('/settings', profileRoutes);
    app.use('/', homeRoutes);

    // =========================
    // Servidor
    // =========================
    app.listen(process.env.PORT, () => {
      console.log(
        `🚀 Servidor corriendo en: ${process.env.URL_BACK}:${process.env.PORT}`
      );
    });

  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error.message);
    process.exit(1);
  }
};

startServer();