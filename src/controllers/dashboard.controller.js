import { check, validationResult } from 'express-validator';
import {Categories, Groups} from '../models/index.model.js';

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
        categories,
        data: {}
    })
};

// Función para crear un nuevo grupo
const newGroup = async (req, res) =>{
    const categories = await Categories.findAll();
    // Validar campos
    await check('name').notEmpty().withMessage('El nombre del grupo es obligatorio').trim()
    .isLength({ min: 3, max: 100 }).withMessage('El nombre debe tener entre 3 y 100 caracteres').escape().toLowerCase().run(req);
    
    await check('description').notEmpty().withMessage('La descripción es obligatoria').trim()
    .isLength({ min: 10, max: 500 }).withMessage('La descripción debe tener entre 10 y 500 caracteres').escape().run(req);
    
    await check('category').notEmpty().withMessage('Debes seleccionar una categoria').isInt({ min: 1 }).withMessage('La categoria debe ser un número válido')
  .toInt().run(req);
  
  await check('url').optional().trim().isURL().withMessage('La URL no es válida').toLowerCase().run(req);

    // Verificar si el resultado es vacio
    const result = validationResult(req);
    if(!result.isEmpty()){
        // Errores
        req.flash('error', result.array().map((res) => res.msg))
        // Mostrar vista
        return  res.render('admin/groups/new-group',{
        namePage: 'Crea un nuevo grupo',
        categories,
        message: req.flash(),
        data: req.body
    });
    }


    try{
        // Verificar que haya usuario logueado
        if (!req.user) {
            req.flash('error', 'Debes iniciar sesión para crear un grupo');
            return res.redirect('/login');
        }

        // Extraer datos del formulario
        const { name, description, category: id_category, image, url } = req.body;
        const { id: id_user } = req.user;

        // Crear el grupo en la BD
        await Groups.create({
            name,
            description,
            image,
            url,
            id_category,
            id_user
        });

        req.flash('exito', 'Se ha creado el grupo correctamente');
        return res.redirect('/dashboard');

    }catch (error) {
        console.error('❌ Error al crear grupo:', error);
        req.flash('error', error.message || 'Hubo un error al crear el grupo');
        return res.redirect('/new-group');
    }
};




export{
    viewDashboard,
    formNewGruop,
    newGroup
}