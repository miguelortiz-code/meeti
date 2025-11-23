import {Groups} from '../models/index.model.js';

export const  viewNewMeeti = async (req, res) =>{
   const groups = await Groups.findAll({where: {id_user: req.user.id}});

   res.render('meeties/new-meeti',{
    namePage: 'Crear tu Meeti',
    groups,
    data: {}
   }) 
}
