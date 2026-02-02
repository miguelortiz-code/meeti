import {Categories} from '../models/index.model.js';
import slug from "slug";
import {check, validationResult} from 'express-validator';

export const viewCategories =  async (req, res) =>{
    const categories = await Categories.findAll({order: [['category', 'ASC']] });
    
    // Mostrar vista de las categorias
    res.render('categories', {
        namePage: "Categorias para los Metti's",
        categories,
        enableBundle: false,
        data: {}
    });
}

// Función para crear categorias
export const newCategory = async (req, res) => {
  // =========================
  // Validaciones del campo
  // =========================
  await check("category")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("El nombre de la categoría no puede ir vacío")
    .isLength({ min: 4 })
    .withMessage("La categoría debe tener al menos 4 caracteres")
    .run(req);

  const result = validationResult(req);

  if (!result.isEmpty()) {
    // Agregar cada error como flash independiente
    result.array().forEach((err) => req.flash("error", err.msg));

    // Volver a cargar categorías
    const categories = await Categories.findAll({ order: [["category", "ASC"]] });

    return res.render("categories", {
      namePage: "Categorías para los Meeti's",
      categories,
      enableBundle: false,
      messages: req.flash(),
      data: (req.session.formData = req.body),
    });
  }

  const { category } = req.body;
  const url = slug(category).toLowerCase();

  try {
    // =========================
    // Validar si ya existe la categoría
    // =========================
    const existing = await Categories.findOne({ where: { category } });
    if (existing) {
      req.flash("error", "La categoría ya existe");
      return res.redirect("/categories");
    }

    // =========================
    // Crear la categoría
    // =========================
    await Categories.create({
      category,
      slug: url,
    });

    req.flash("exito", "Categoría creada correctamente");
    res.redirect("/categories");
  } catch (error) {
    // Manejar errores de Sequelize (por ejemplo, llave duplicada)
    const message = error?.parent?.detail || error.message || "Error al crear la categoría";
    req.flash("error", message);
    res.redirect("/categories");
  }
};