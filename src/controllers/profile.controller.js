import {Users} from '../models/index.model.js';

export const viewProfile = async (req, res )=>{
    const {code} = req.params; // Extaer el code del user desde la url
    const user = await Users.findOne({where: {code}}); // Buscar usuario por el code
    // Mostrar la vista para editar el perfil de usuario
    res.render('profile/edit-profile', {
        namePage: 'Editar Perfil',
        user
    })
}