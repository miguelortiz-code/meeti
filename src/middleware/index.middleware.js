import multer from "multer";
import fs from "fs";
import path from "path";

// Flash Messages
export const flashMiddleware = (req, res, next) => {
  res.locals.messages = req.flash();
  next();
};

// Validar si el usuario está autenticado
export const isAuthenticate = (req, res, next) => {
  // Revisar usuario
  if (req.isAuthenticated()) {
    return next(); // Usuario Autenticado
  }

  // Si no esta autenticado, redireccionar al login
  res.redirect("/auth/login");
};

// Eliminar Cache del navegador
export const noCache = (req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  next();
};

/**
 * Middleware de manejo de errores de Multer que guarda los datos del formulario
 * para no perderlos si ocurre un error.
 */
export const multerErrorHandler = (fallbackPath = "/") => {
  return (err, req, res, next) => {
    if (err) {
      // Mensajes de error personalizados
      if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
        req.flash("error", "La imagen es demasiado grande. Máximo 1MB.");
      } else {
        req.flash("error", err.message || "Error al subir la imagen.");
      }

      // const redirectPath = req.get("referer") || fallbackPath;
        return res.redirect(req.originalUrl);
    }

    next();
  };
};

/**
 * Middleware para actualizar imagenes con carpeta dinamica
 */
export const updateImage = (folder) => {
  return async (req, res, next) => {
    try {
      // 📌 Paso 1: Si NO se subió una imagen al crear el grupo → no hacemos nada
      if (!req.file) {
        req.updateFinished = false;
        return next(); // continuar con la ejecución
      }

      // 📌 Paso 2: obtener el registro que dejó el controller anterior saveImageGroup
      const record = req.record;
      if (!record) throw new Error("Falta req.record antes de updateImage()");

      // 📌 Paso 3: Si existía una imagen previa →  obtener la url completa
      if (record.image) {
        const oldImagePath = path.join(
          import.meta.dirname,
          "..",
          "public",
          "uploads",
          folder,
          record.image
        );
        // 📌 Paso 4: Eliminar la imagen anterior
        try {
          await fs.promises.unlink(oldImagePath);
        } catch (err) {
          // ⚠ Si el error NO es "archivo no encontrado (ENOENT)" lo mostramos
          if (err.code !== "ENOENT") {
            console.error("⚠ Error eliminando imagen:", err);
          }
          // Si el archivo no existe, simplemente continuamos
        }
      }

      // 📌 Paso 5: Guardar la nueva imagen en la BD
      record.image = req.file.filename;
      await record.save();

      // 📌 Paso 5: Finalizar el flujo con éxito
      req.updateFinished = true;
      req.flash("exito", "Imagen del grupo se ha actualizado correctamente");
      return res.redirect("/dashboard");

    } catch (error) {
      // 📌 Paso 6: Manejar errores del proceso
      console.error("❌ Error en updateImage:", error);
      req.flash("error", "Hubo un error procesando la imagen");
      return res.redirect(req.originalUrl); // ← regresar a la misma página
    }
  };
};

/**
 * Middleware para validar el código UUID
 */
export const validateUUID = (req, res, next) => {
  const { code } = req.params;

  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (!uuidRegex.test(code)) {
    req.flash('error', 'Código de Meeti inválido');
    return res.redirect('/dashboard');
  }

  next();
};