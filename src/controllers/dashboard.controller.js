import Groups from '../models/groups.models.js'

export const viewDashboard = async (req, res) =>{
    // Obtener todos los grupos
    const groups = await Groups.findAll({where: {id_user: req.user.id}});
    // Renderizar vista del dashboard
    res.render('admin/home',{
        namePage: 'Panel Administrativo',
        groups
    })
}