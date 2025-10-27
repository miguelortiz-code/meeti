// Flash Messages
export const flashMiddleware = (req, res, next) => {
  res.locals.messages = req.flash();
  next();
};

// Validar si el usuario está autenticado
export const isAuthenticate = (req, res, next) =>{
    // Revisar usuario
    if(req.isAuthenticate()){
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