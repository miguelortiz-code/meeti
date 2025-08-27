import bcrypt from "bcrypt";
import { check, validationResult } from "express-validator";
import { Users } from "../models/index.model.js";
import { generateId } from "../helpers/token.helper.js";
import { emailRegister } from "../helpers/emails.helper.js";
import passport from "passport";

// Vista de la página principal
const viewHome = (req, res) => {
  res.render("home", {
    namePage: "Inicio",
  });
};

// Vista para registrar usuario
const viewRegister = (req, res) => {
  res.render("auth/register", {
    namePage: "Crear Cuenta",
    user: {},
  });
};

// Función para registrar usuario
const register = async (req, res) => {
  const { name, email, password, confirm_password } = req.body;

  try {
    // Validaciones
    await check("name")
      .notEmpty()
      .withMessage("El nombre es obligatorio")
      .trim()
      .escape()
      .toLowerCase()
      .run(req);
    await check("email")
      .notEmpty()
      .withMessage("El correo es obligatorio")
      .isEmail()
      .withMessage("El formato del correo es inválido")
      .normalizeEmail()
      .run(req);
    await check("password")
      .notEmpty()
      .withMessage("La contraseña es obligatoria")
      .isLength({ min: 8 })
      .withMessage("La contraseña debe tener mínimo 8 caracteres")
      .trim()
      .run(req);
    await check("confirm_password")
      .notEmpty()
      .withMessage("La confirmación de la contraseña es obligatoria")
      .custom((val, { req }) => {
        if (val !== req.body.password) {
          throw new Error("Las contraseñas no coinciden");
        }
        return true;
      })
      .trim()
      .run(req);

    let result = validationResult(req);

    // Validar si hay errores
    if (!result.isEmpty()) {
      req.flash(
        "error",
        result.array().map((err) => err.msg)
      );
      return res.render("auth/register", {
        namePage: "Crear Cuenta",
        message: req.flash(),
        user: { name, email },
      });
    }

    // Verificar usuario existente
    const existUser = await Users.findOne({ where: { email } });
    if (existUser) {
      req.flash("error", "El correo ya está registrado");
      return res.render("auth/register", {
        namePage: "Crear Cuenta",
        message: req.flash(),
        user: { name, email },
      });
    }

    // Hashear contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Guardar usuario
    const user = await Users.create({
      name,
      email,
      password: hashedPassword,
      token: generateId(),
    });

    // Enviar mensaje de confirmación
    emailRegister({
      name: user.name,
      email: user.email,
      token: user.token,
    });

    // Mostrar mensaje de confirmación
    res.render("auth/confirm", {
      namePage: "Cuenta Creada Correctamente",
      message: {
        exito: [
          "Te hemos enviado un correo con un enlace de confirmación. Por favor, revisa tu bandeja de entrada y sigue las instrucciones para activar tu cuenta.",
        ],
      },
    });
  } catch (error) {
    console.error(error);
    req.flash("error", "Hubo un problema al registrar el usuario");
    return res.render("auth/register", {
      namePage: "Crear Cuenta",
      message: req.flash(),
      user: { name, email },
    });
  }
};

// Vista de confirmar cuenta
const ConfirmAccount = async (req, res) =>{
  // extraer el token desde la url
  const {token } = req.params;
  
  // Buscar usuario mediante el token
  const user = await Users.findOne({where: {token}});
  
  // Verificar si el usuario  no existe
  if(!user){
    return res.render('auth/confirm',{
      namePage: 'Error al confirmar tu cuenta',
      message: {
        error: [
          "La cuenta no existe o el enlace de confirmación no es válido. Intenta nuevamente",
        ],
      }
    })
  }

  // confirmar cuenta del usuario
  user.token = null;
  user.active = 1;  
 await user.save()

 // Redireccionar al usuario
 req.flash('exito',  'La cuenta se ha confirmado con exito, ya puedes iniciar sesión')
 return res.render("auth/login", {
      namePage: "Iniciar Sesión",
      message: req.flash(),
      user: {},
    });


}

// vista para login
const viewLogin = (req, res) => {
  res.render("auth/login", {
    namePage: "Iniciar Sesión",
    user: {},
  });
};

// Función para login de usuario
const login = async (req, res, next) =>{
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true,
    badRequestMessage: 'Los campos son obligatorios'
  })(req, res, next);
}

export { viewHome, viewRegister, register, viewLogin, ConfirmAccount, login };
