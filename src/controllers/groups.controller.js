import striptags from "striptags";
import { check, validationResult } from "express-validator";
import { Categories, Groups } from "../models/index.model.js";

// Vista para crear Grupos
export const viewNewGroup = async (req, res) => {
  // Buscar todas las categorias
  const categories = await Categories.findAll();
  res.render("groups/new-group", {
    namePage: "Crear nuevo grupo",
    categories,
    data: {}
  });
};

// Funcion para crear grupos
export const newGroup = async (req, res, next) => {
  // Validaciones
  await check("name")
    .trim()
    .escape()
    .notEmpty().withMessage("El nombre del grupo no puede ir vacío")
    .isLength({ min: 5 }).withMessage("El grupo debe tener al menos 5 caracteres")
    .run(req);

  await check("description")
    .trim()
    .escape()
    .notEmpty().withMessage("La descripción no puede ir vacía")
    .isLength({ min: 15 }).withMessage("La descripción debe tener mínimo 15 caracteres")
    .run(req);    

  await check("category")
    .trim()
    .notEmpty().withMessage("La categoría no puede ir vacía")
    .run(req);
    

  await check("url")
    .trim()
    .escape()
    .notEmpty().withMessage("La URL no puede ir vacía")
    .isURL({
      protocols: ["http", "https"],
      require_protocol: true,
    }).withMessage("La URL no es válida, asegúrate de incluir http:// o https://")
    .run(req);

  // Obtener los errores de validación
  const result = validationResult(req);

  if (!result.isEmpty()) {
    // Agregar cada error como un mensaje flash independiente
    result.array().forEach(err => req.flash("error", err.msg));

    // Volver a cargar categorías
    const categories = await Categories.findAll();

    return res.render("groups/new-group", {
      namePage: "Crear Nuevo Grupo",
      categories,
      messages: req.flash(),
      data: req.body,
    });
  }

  // Si no hay errores
  const { name, category: id_category, url } = req.body;
  const description = striptags(req.body.description).trim();
  const { id: id_user } = req.user;

  try {
    await Groups.create({
      group: name,
      description,
      id_category,
      url,
      id_user,
    });

    req.flash("exito", "Grupo creado correctamente");
    return res.redirect("/dashboard");
  } catch (error) {
    console.error("❌ Error al crear el grupo:", error);
    // Si el error viene de Sequelize (por ejemplo, violación de constraint)
    const message =
      error?.parent?.detail || error.message || "Error al crear el grupo";

    req.flash("error", message);
    res.redirect("/groups/new-group");
  }
};
