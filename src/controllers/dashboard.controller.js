import {Groups} from '../models/index.model.js';

// Vista del panel principal
const viewDashboard = async (req, res) =>{
    // Buscar todos los grupos
    const groups = await Groups.findAll({where: {id_user : req.user.id}});
    res.render('admin/dashboard',{
        namePage : 'Panel administrativo',
        groups
    })
}

export{
    viewDashboard,
}