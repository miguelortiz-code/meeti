import bcrypt from 'bcrypt';
import db from '../config/db.js';
import {Users} from '../models/index.model.js';


// Vista de formulario de registro
const viewRegister = (req, res) =>{
    res.render('auth/register', {
        namePage: 'Crear Cuenta',
    });
}

// Vista de formulario de login
const viewLogin = (req, res) =>{
    res.render('auth/login', {
        namePage: 'Iniciar sesión',
    });
}

// Funcion para registrar usuarios
const register = async (req, res, next) =>{
    try {
        const {name, email, password} = req.body;
        // Encriptar contraseña
        const hasedPassword = await bcrypt.hash(password, 10); 

        // Crear usuario
        const newUser = await Users.create({
            name,
            email,
            password:hasedPassword
        });

    } catch (error) {
        console.error('❌ Error al registrar usuario:', error);
        res.status(500).send('Error al registrar usuario');
    }
};

export{
    viewRegister,
    viewLogin,
    register
}