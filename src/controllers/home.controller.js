const viewHome = (req, res) =>{
    res.render('home');
}

const viewRegister = (req, res) =>{
    res.render('auth/register')
}

export {
    viewHome,
    viewRegister
}