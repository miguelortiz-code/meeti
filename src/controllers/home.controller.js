import bcrypt from 'bcrypt';
import {Users} from '../models/index.model.js';

// Vista de la página principal
const viewHome = (req, res) =>{
    res.render('home',{
        namePage: 'Inicio'
    });
}

// Vista para registrar usuario
const viewRegister = (req, res) =>{
    res.render('auth/register',{
        namePage: 'Crear Cuenta'
    })
}

// Función para registrar usuario
const register =  async (req, res) =>{
    // Extraer datos del formulario
    const {name, email, password, confirm_password} = req.body;

    // // Verificar que el usuario no se encuentre registrado
    // const existUser = await Users.findOne({where: email});
    // if(existUser){
    //     return res.render('auth/register',{
    //         namePage: 'Crear Cuenta',
    //         errors: [{msg: 'El usuario ya se encuentra registrado'}],
    //         user: {
    //             name,
    //             email
    //         }
    //     });
    // }

    // Hasear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, salt);

    // Guardar al usuario
    const user = await Users.create({
        name,
        email,
        password: hasedPassword
    });

    console.log(user);
    
}
export {
    viewHome,
    viewRegister,
    register
}