import multer from "multer";

const multerErrorHandler = (err, req, res, next) => {
  if (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        req.flash("error", "La imagen es demasiado grande. Máximo 2MB.");
      } else {
        req.flash("error", err.message || "Error al subir el archivo.");
      }
    } else {
      req.flash("error", err.message || "Error al subir el archivo.");
    }

    // Guardar los datos ya ingresados
    req.flash("data", req.body);

    return res.redirect("/new-group");
  }

  next();
};

export default multerErrorHandler;