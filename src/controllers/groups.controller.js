import striptags from 'striptags';
import {Categories, Groups} from '../models/index.model.js';

// Vista para crear Grupos
export const viewNewGroup = async (req, res) =>{
   // Buscar todas las categorias
   const categories  = await Categories.findAll();
   res.render('groups/new-group',{
    namePage: 'Crear nuevo grupo',
    categories
   }) 
}

// Funcion para crear grupos
export const newGroup = async (req, res, next) =>{
  const { name, category:id_category, url } = req.body;
  const description = striptags(req.body.description).trim();
  const {id: id_user} = req.user


   try {
      // Almacenar Grupo
      await Groups.create({
         group: name,
         description,
         id_category,
         url,
         id_user
      });

      // Mostrar mensaje de exito
      req.flash('exito', 'Grupo Creado Correctamente');
      // Redireccionar
      res.redirect('/dashboard');
   }catch (error) {
      console.error('❌ Error al crear el grupo:', error);
      // Si el error viene de Sequelize (por ejemplo, violación de constraint)
      const message = error?.parent?.detail || error.message || 'Error al crear el grupo';

      req.flash('error', message);
      res.redirect('/groups/new-group');
   }
}