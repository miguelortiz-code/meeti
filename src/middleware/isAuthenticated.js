// Validar si el usuario está autenticado
const isAuthenticated = (req, res, next) =>{
    // Revisar usuario
    if(req.isAuthenticated()){
        return next(); // Está logueado
    }

    // Si no está logueado, redirigir al login
    res.redirect('/login');
}

const noCache =  (req, res, next) =>{
    res.set('Cache-control', 'no-store', 'no-cache', 'must-revalidate', 'private');
    next();
}


export { isAuthenticated, noCache}