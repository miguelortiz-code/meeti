import bcrypt from 'bcrypt';
import { check, validationResult } from 'express-validator';
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
        namePage: 'Crear Cuenta',
        user: {}
    })
}

// Función para registrar usuario
const register = async (req, res) => {
    const { name, email, password, confirm_password } = req.body;

    // Validaciones
    await check('name').notEmpty().withMessage('El nombre es obligatorio').trim().escape().toLowerCase().run(req);
    await check('email').notEmpty().withMessage('El correo es obligatorio').isEmail().withMessage('El formato del correo es inválido').normalizeEmail().run(req);
    await check('password').notEmpty().withMessage('La contraseña es obligatoria').isLength({ min: 8 }).withMessage('La contraseña debe tener mínimo 8 caracteres').trim().run(req);
    await check('confirm_password').notEmpty().withMessage('La confirmación de la contraseña es obligatoria')
        .custom((val, { req }) => {
            if (val !== req.body.password) {
                throw new Error('Las contraseñas no coinciden');
            }
            return true;
        }).trim().run(req);

    let result = validationResult(req);

    // Validar si hay errores
    if (!result.isEmpty()) {
        req.flash('error', result.array().map(err => err.msg));
        return res.render('auth/register', {
            namePage: 'Crear Cuenta',
            message: req.flash(),
            user: { name, email }
        });
    }

    try {
        // Verificar usuario existente
        const existUser = await Users.findOne({ where: { email } });
        if (existUser) {
            req.flash('error', 'El correo ya está registrado');
            return res.render('auth/register', {
                namePage: 'Crear Cuenta',
                message: req.flash(),
                user: { name, email }
            });
        }

        // Hashear contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Guardar usuario
        await Users.create({ name, email, password: hashedPassword });

        // Mostrar mensaje y redireccionar
        req.flash('exito', 'Hemos enviado un correo electrónico para confirmar tu cuenta');
        return res.redirect('/login');

    } catch (error) {
        console.error(error);
        req.flash('error', 'Hubo un problema al registrar el usuario');
        return res.render('auth/register', {
            namePage: 'Crear Cuenta',
            message: req.flash(),
            user: { name, email }
        });
    }
};


export {
    viewHome,
    viewRegister,
    register
}