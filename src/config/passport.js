import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import Users from "../models/users.models.js";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },

    async (email, password, next) => {
      try {
        // Buscar al usuario por el email
        const user = await Users.findOne({ where: { email } });

        // Revisar si no existe el usuario
        if (!user)
          return next(null, false, {
            message: "El usuario no se encuentra registrado",
          });

        // Validar que el usuario este activo
        if (user.active === 0)
          return next(null, false, {
            message: "Tú cuenta aún no se ha confirmado",
          });

        // Si el usuario existe, verificar la contraseña
        const verifyPassword = await bcrypt.compare(password, user.password);
        if (!verifyPassword)
          return next(null, false, {
            message: "La contraseña es incorrecta",
          });

        // Usuario logueado
        return next(null, user);
      } catch (error) {
        return next(error);
      }
    }
  )
);

// Serializaar usuario
passport.serializeUser((user, next) =>{
    next(null, user.id);
});

// Deserializar usuario
passport.deserializeUser(async (id, next) =>{
    try {
        const user = await Users.findByPk(id);
        next(null, user);
    } catch (error) {
        next(error, null);
    }
});

export default passport;