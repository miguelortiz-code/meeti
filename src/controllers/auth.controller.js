import bcrypt from "bcrypt";
import { check, validationResult } from "express-validator";
import { Users } from "../models/index.model.js";

// Vista de formulario de registro
const viewRegister = (req, res) => {
  res.render("auth/register", {
    namePage: "Crear Cuenta",
    user: {},
  });
};

// Vista de formulario de login
const viewLogin = (req, res) => {
  res.render("auth/login", {
    namePage: "Iniciar sesión",
  });
};

// Funcion para registrar usuarios
const register = async (req, res, next) => {
  try {
    // Validar campos del formulario
    await check("name")
      .trim()
      .notEmpty()
      .withMessage("El nombre es obligatorio")
      .isLength({ min: 3 })
      .withMessage("El nombre debe tener al menos 3 caracteres")
      .run(req);

    await check("email")
      .normalizeEmail()
      .isEmail()
      .withMessage("Debes ingresar un correo electrónico válido")
      .notEmpty()
      .withMessage("El correo electrónico es obligatorio")
      .run(req);

    await check("password")
      .notEmpty()
      .withMessage("La contraseña es obligatoria")
      .isLength({ min: 6 })
      .withMessage("La contraseña debe tener al menos 6 caracteres")
      .run(req);

    await check("confirm_password")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Las contraseñas no coinciden");
        }
        return true;
      })
      .run(req);

    // Obtener los errores
    const result = validationResult(req);

    // Si hay errores, renderizar la vista de registro
    if (!result.isEmpty()) {
      req.flash(
        "error",
        result.array().map((err) => err.msg)
      );
      return res.render("auth/register", {
        namePage: "Crear Cuenta",
        messages: req.flash(),
        user: {
          name: req.body.name,
          email: req.body.email,
        },
      });
    }

    // Si todo está bien => Continuar con el registro
    const { name, email, password } = req.body;
    // Encriptar contraseña
    const hasedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    await Users.create({
      name,
      email,
      password: hasedPassword,
    });

    req.flash("exito", "Te has registrado correctamente");
    res.redirect("/auth/login");
  } catch (error) {
    if (error?.original?.detail) {
      // Sequelize suele anidar el error real en error.original
      console.error("❌ Error al registrar usuario:", error.original.detail);
    } else if (error?.detail) {
      console.error("❌ Error al registrar usuario:", error.detail);
    } else {
      console.error("❌ Error al registrar usuario:", error);
    }
  }
};

export { viewRegister, viewLogin, register };
