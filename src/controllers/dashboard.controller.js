// Vista del panel principal
const viewDashboard = (req, res) =>{
    res.render('admin/dashboard',{
        namePage : 'Panel administrativo'
    })
}

// Vista de formularios
const formNewGruop = (req, res) =>{
    res.render('admin/groups/new-group',{
        namePage: 'Crea un nuevo grupo'
    })
};


export{
    viewDashboard,
    formNewGruop
}