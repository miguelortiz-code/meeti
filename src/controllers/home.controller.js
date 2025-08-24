const viewHome = (req, res) =>{
    res.render('home',{
        namePage: 'Inicio'
    });
}

const viewRegister = (req, res) =>{
    res.render('auth/register',{
        namePage: 'Crear Cuenta'
    })
}

export {
    viewHome,
    viewRegister
}