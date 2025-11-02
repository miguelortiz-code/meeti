import {Categories} from '../models/index.model.js';

export const viewNewGroup = async (req, res) =>{
   // Buscar todas las categorias
   const categories  = await Categories.findAll();
   res.render('groups/new-group',{
    namePage: 'Crear nuevo grupo',
    categories
   }) 
}