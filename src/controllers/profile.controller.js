import striptags from "striptags";
import bcrypt from 'bcrypt'
import {Users} from '../models/index.model.js';
import { check, validationResult } from "express-validator";

// Vista para editar perfil
export const viewProfile = async (req, res )=>{
    const {code} = req.params; // Extaer el code del user desde la url
    const user = await Users.findOne({where: {code}}); // Buscar usuario por el code
    // Mostrar la vista para editar el perfil de usuario
    res.render('profile/edit-profile', {
        namePage: 'Editar Perfil',
        user,
        data: {}
    })
}

// Función para editar perfil
export const profile = async (req, res ) =>{
    const{code} = req.params; // Extaer codigo del usuario desde la url
    const user = await Users.findOne({where: {code}}); // Buscar usuario por el code

    // Validaciones 
    await check('name')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('El nombre de usuario no puede ir vacio')
    .run(req)

    await check("description")
    .trim()
    .notEmpty()
    .withMessage("La descripción no puede ir vacía")
    .isLength({ min: 15 })
    .withMessage("La descripción debe tener mínimo 15 caracteres")
    .run(req);

    await check('email')
    .trim()
    .notEmpty()
    .withMessage('El correo electronico no puede ir vacío')
    .isEmail()
    .withMessage('El correo electronico debe ser valido')
    .run(req);

    // Obtener los errores de validacion
  const result = validationResult(req);

  if(!result.isEmpty()){
    // Agregar cada error como un mensaje flash independiente
    result.array().forEach((err) => req.flash("error", err.msg));
    const user = await Users.findOne({where: {code}}); // Buscar usuario por el code
    // Mostrar nuevamente los errores
    return res.render("profile/edit-profile", {
      namePage: "Editar Perfil",
      user,
      messages: req.flash(),
      data: (req.session.formData = req.body),
    });
  }

    // extaer información del formulario
    const description = striptags(req.body.description).trim();
    const {name, email } = req.body;

    try {
      await user.update({
        name,
        description,
        email
      });
      // Redireccionar la usuario
    req.flash('exito', 'Perfil editado correctamente');
    res.redirect('/dashboard');
    } catch (error) {
          console.error(error);
    req.flash('error', 'Error al editar perfil');
    res.redirect(`/settings/${code}`);
    }
}

export const viewChangePassword = async (req, res) =>{
  const{code} = req.params;

  const user = await Users.findOne({where: {code}});

  res.render('profile/change-password', {
    namePage: 'Cambia tu contaseña',
    user
  })
}

// Función para cambiar la contaseña
export const changePassword = async(req, res) =>{
  const {code} = req.params;
  const user = await Users.findOne({where: {code, id: req.user.id}});
  const {beforePassword, newPassword} = req.body; 
  // Verificar el password anterior
  const checkPassword = await bcrypt.compare(beforePassword, user.password);
  if(!checkPassword){
  return res.render('profile/change-password', {
    namePage: 'Cambia tu contaseña',
    user,
    messages: {
      error: ['La contraseña actual es incorrecta']
    }
  })
 }

  // si el password anterior es correcto, hasear el nuevo password
 const passwordHaseado = await bcrypt.hash(newPassword, 10);
  // Asingar el nuevo password
  user.password = passwordHaseado;
  // Guardar en la base de datos
  await user.save();

  // Cerrar sesión después del cambio de contraseña
  req.logout(err => {
    if (err) {
      return next(err);
  }
  // Mensaje de exito
  req.flash('exito', 'La contraseña ha sido cambiada de manera correcta. Inicia sesión nuevamente con tu nueva contraseña.');
   // Redireccionar al login
    res.redirect('/auth/login');
  });
}