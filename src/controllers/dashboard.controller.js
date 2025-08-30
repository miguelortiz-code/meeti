import {Categories} from '../models/index.model.js';

// Vista del panel principal
const viewDashboard = (req, res) =>{
    res.render('admin/dashboard',{
        namePage : 'Panel administrativo'
    })
}

// Vista de formularios
const formNewGruop = async (req, res, next) =>{
    const categories = await Categories.findAll();

    res.render('admin/groups/new-group',{
        namePage: 'Crea un nuevo grupo',
        categories
    })
};


export{
    viewDashboard,
    formNewGruop
}