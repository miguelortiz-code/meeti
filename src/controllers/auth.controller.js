// Vista de formulario de registro
const viewRegister = (req, res) =>{
    res.render('auth/register', {
        namePage: 'Crear Cuenta',
    });
}

// Vista de formulario de login
const viewLogin = (req, res) =>{
    res.render('auth/login', {
        namePage: 'Iniciar sesión',
    });
}

export{
    viewRegister,
    viewLogin
}