// Vista de formulario de registro
const viewRegister = (req, res) =>{
    res.render('auth/register');
}

// Vista de formulario de login
const viewLogin = (req, res) =>{
    res.render('auth/login');
}

export{
    viewRegister,
    viewLogin
}