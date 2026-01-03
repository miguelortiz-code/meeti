import {Users} from '../models/index.model.js';

export const viewProfile = async (req, res )=>{
    // Buscar usuario por el id
    const user = await Users.findByPk(req.user.id);

    res.render('profile/edit-profile', {
        namePage: 'Editar Perfil',
        user
    })
}