import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import Users from "../models/users.model.js";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        // Buscar usuario por email
        const user = await Users.findOne({ where: { email} });
        // Verificar si el usuario está registrado
        if (!user) {
          return done(null, false, { message: "El usuario no se ha registrado" });
        }
        // Verificar si el usuario no ha confirmado la cuenta
        if (user.active !== 1) {
          return done(null, false, { message: "El usuario no ha confirmado la cuenta" });
        }

        // Validar contraseña
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return done(null, false, { message: "Credenciales incorrectas" });
        }

        // Todo correcto
        return done(null, user);

      } catch (error) {
        console.error("Error en Passport LocalStrategy:", error);
        return done(error);
      }
    }
  )
);

// Serialización
passport.serializeUser((user, done) => {
  done(null, user.id); // Sequelize usa "id"
});

// Deserialización
passport.deserializeUser(async (id, done) => {
  try {
    const user = await Users.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;