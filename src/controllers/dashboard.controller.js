import {Groups, Meeties} from '../models/index.model.js';

export const viewDashboard = async (req, res) =>{
    
    // Consulta multiple
    const queries = [];
    queries.push( Groups.findAll({where: {id_user: req.user.id},  order: [['group', 'ASC']]}))
    queries.push (Meeties.findAll({where: {id_user: req.user.id},  order: [['title', 'ASC']]}))
    
    // Ejecutar queries de manera simultanea
    const [groups, meeties] = await Promise.all(queries);
    
    /* Obtener todos los grupos || Una sola consulta 
        const groups = await Groups.findAll({where: {id_user: req.user.id},  order: [['group', 'ASC']]}); 
    */
    
    // Renderizar vista del dashboard
    res.render('admin/home',{
        namePage: 'Panel Administrativo',
        groups,
        meeties
    })
}