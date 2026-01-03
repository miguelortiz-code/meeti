import striptags from "striptags";
import {Users} from '../models/index.model.js';

// Vista para editar perfil
export const viewProfile = async (req, res )=>{
    const {code} = req.params; // Extaer el code del user desde la url
    const user = await Users.findOne({where: {code}}); // Buscar usuario por el code
    // Mostrar la vista para editar el perfil de usuario
    res.render('profile/edit-profile', {
        namePage: 'Editar Perfil',
        user
    })
}

// Función para editar perfil
export const profile = async (req, res ) =>{
    const{code} = req.params; // Extaer codigo del usuario desde la url
    const user = await Users.findOne({where: {code}}); // Buscar usuario mediante el código

    // extaer información del formulario
    const description = striptags(req.body.description).trim();
    const {name, email } = req.body;
}