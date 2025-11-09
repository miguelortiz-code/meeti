import multer from "multer";

// Flash Messages
export const flashMiddleware = (req, res, next) => {
  res.locals.messages = req.flash();
  next();
};

// Validar si el usuario está autenticado
export const isAuthenticate = (req, res, next) =>{
    // Revisar usuario
    if(req.isAuthenticated()){
      return next(); // Usuario Autenticado
    }

    // Si no esta autenticado, redireccionar al login
    res.redirect('/auth/login');
}

// Eliminar Cache del navegador
export const noCache = (req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
};

/**
 * Middleware de manejo de errores de Multer que guarda los datos del formulario
 * para no perderlos si ocurre un error.
 */
export const multerErrorHandler = (fallbackPath = '/') => {
  return (err, req, res, next) => {
    if (err) {
      // Mensajes de error personalizados
      if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
        req.flash('error', 'La imagen es demasiado grande. Máximo 1MB.');
      } else {
        req.flash('error', err.message || 'Error al subir la imagen.');
      }
      
      const redirectPath = req.get('referer') || fallbackPath;
      return res.redirect(redirectPath);
    }

    next();
  };
};