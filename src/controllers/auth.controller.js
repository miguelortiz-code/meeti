// Vista de formulario de registro
const viewRegister = (req, res) =>{
    res.send('Formulario de registro');
    
    console.log('Formulario de registro');
}

// Vista de formulario de login
const viewLogin = (req, res) =>{
    res.send('Formulario de login');
    console.log('Formulario de login');
}

export{
    viewRegister,
    viewLogin
}