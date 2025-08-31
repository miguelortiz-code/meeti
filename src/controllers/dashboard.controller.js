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
        categories
    })
};

// Función para crear un nuevo grupo
const newGroup = async (req, res) =>{
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