import fs from "fs";
import path from "path";
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
    data: {},
  });
};

// Funcion para crear grupos
export const newGroup = async (req, res, next) => {
  // Sanitizar la descripción del grupo
  const description = striptags(req.body.description).trim();
  // Validaciones
  await check("name")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("El nombre del grupo no puede ir vacío")
    .isLength({ min: 5 })
    .withMessage("El grupo debe tener al menos 5 caracteres")
    .run(req);

  await check("description")
    .trim()
    .notEmpty()
    .withMessage("La descripción no puede ir vacía")
    .isLength({ min: 15 })
    .withMessage("La descripción debe tener mínimo 15 caracteres")
    .run(req);

  await check("category")
    .trim()
    .notEmpty()
    .withMessage("La categoría no puede ir vacía")
    .run(req);

  await check("url")
    .trim()
    .notEmpty()
    .withMessage("La URL no puede ir vacía")
    .isURL({
      protocols: ["http", "https"],
      require_protocol: true,
    })
    .withMessage("La URL no es válida, asegúrate de incluir http:// o https://")
    .run(req);

  // Obtener los errores de validación
  const result = validationResult(req);

  if (!result.isEmpty()) {
    // Agregar cada error como un mensaje flash independiente
    result.array().forEach((err) => req.flash("error", err.msg));

    // Volver a cargar categorías
    const categories = await Categories.findAll();

    return res.render("groups/new-group", {
      namePage: "Crear Nuevo Grupo",
      categories,
      messages: req.flash(),
      data: (req.session.formData = req.body),
    });
  }

  // Si no hay errores
  const { name, category: id_category, url } = req.body;
  const { id: id_user } = req.user;

  // Verifica si se subió una imagen
  let image = null;
  if (req.file) {
    image = req.file.filename;
  }

  try {
    await Groups.create({
      group: name,
      description,
      id_category,
      url,
      id_user,
      image,
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

// Vista para editar grupo
export const viewEditGroup = async (req, res, next) => {
  // Extraer el código del grupo desde la url
  const { code } = req.params;

  // Buscar grupo por medio del code y categorias
  const queries = [];
  queries.push(Groups.findOne({ where: { code } }));
  queries.push(Categories.findAll());

  const [group, categories] = await Promise.all(queries);

  // Validar que el grupo exista
  if (!group) {
    req.flash("error", "El grupo no existe");
    return res.redirect("/dashboard");
  }
  // Si todo esta bien, renderizar la vista del formulario para editar el grupo
  res.render("groups/edit-group", {
    namePage: `Edita el grupo: ${group.group}`,
    group,
    categories,
  });
};

// Funcion para editar grupos
export const editGroup = async (req, res) => {
  // Extraer código del grupo desde la url
  const { code } = req.params;
  // Creador del grupo
  const { id } = req.user;
  // Consultas de grupo y categoria
  const [group, categories] = await Promise.all([
    Groups.findOne({ where: { code, id_user: id } }),
    Categories.findAll(),
  ]);

  // Validar que el grupo exista
  if (!group) {
    req.flash("error", "El grupo no existe");
    return res.redirect("/dashboard");
  }

  // Validaciones del formulario
  await check("name")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("El nombre del grupo no puede ir vacío")
    .isLength({ min: 5 })
    .withMessage("El grupo debe tener al menos 5 caracteres")
    .run(req);

  await check("description")
    .trim()
    .notEmpty()
    .withMessage("La descripción no puede ir vacía")
    .isLength({ min: 15 })
    .withMessage("La descripción debe tener mínimo 15 caracteres")
    .run(req);

  await check("category")
    .trim()
    .notEmpty()
    .withMessage("La categoría no puede ir vacía")
    .run(req);

  await check("url")
    .trim()
    .notEmpty()
    .withMessage("La URL no puede ir vacía")
    .isURL({
      protocols: ["http", "https"],
      require_protocol: true,
    })
    .withMessage("La URL no es válida, asegúrate de incluir http:// o https://")
    .run(req);

  // Obtener los errores de validación
  const result = validationResult(req);

  if (!result.isEmpty()) {
    // Agregar cada error como un mensaje flash independiente
    result.array().forEach((err) => req.flash("error", err.msg));
    // Renderizar el formulario con los errores
    return res.render("groups/edit-group", {
      namePage: `Edita el grupo: ${group.group}`,
      group,
      categories,
      messages: req.flash(),
    });
  }

  // Validaciones correctas y todo está bien, guardar cambios
  try {
    const { name, category: id_category, url } = req.body;
    const description = striptags(req.body.description).trim();

    // Actualizar grupo
    await group.update({
      group: name,
      description,
      id_category,
      url,
    });
    // Mostrar mensaje de exito y redireccionar al dashboard
    req.flash("exito", "Grupo actualizado correctamente");
    return res.redirect("/dashboard");
  } catch (error) {
    console.error("❌ Error al actualizar grupo:", error);
    req.flash(
      "error",
      error?.parent?.detail || error.message || "Error al actualizar el grupo"
    );
    return res.redirect(`/groups/edit/${code}`);
  }
};

// Vista para editar imagen del grupo
export const viewImageGroup = async (req, res) =>{
  // Extraer el código del grupo desde la url
  const {code} = req.params;
  // Buscar grupo mediante el código
  const group = await Groups.findOne({where: {code}});

  // Validar que el grupo exista
  if (!group) {
    req.flash("error", "El grupo no existe");
    return res.redirect("/dashboard");
  }

  // Si todo está bien, renderizar la vista
  res.render('groups/image-group', {
    namePage: `Edita la imagen del grupo:  ${group.group}`,
    group
  })
}

// Funcion para almacenar y editar imagen de grupo
export const saveImageGroup = async (req, res, next) => {
  const { code } = req.params;
  const { id } = req.user;

  try {
    //📌 Paso 1: obtener grupo
    const group = await Groups.findOne({ where: { code, id_user: id } });
    //📌 Paso 2: Validar que el grupo exista
    if (!group) {
      req.flash("error", "No existe el grupo seleccionado");
      return res.redirect("/dashboard");
    }

    // DEBUGGING -> Validar que exista una imagen anterior
    // if(group.image){
    //   console.log(group.image);
    // }

    // DEBUGGING -> Verificar si estan subiendo una imagen nueva
    // if(req.file){
    //   console.log(req.file.filename);
    // }

    //📌 Paso 3: Crear el req.record para que el siguiente middleware lo use
    req.record = group;
    //📌 Paso 4: Pasar al siguiente Middleware updateImage()
    return next();
  } catch (error) {
    console.error("❌ Error en saveImageGroup:", error);
    req.flash("error", "Hubo un error procesando la imagen");
    return res.redirect("/dashboard");
  }
};
