import { check, validationResult } from 'express-validator';
import striptags from "striptags";
import {Categories, Groups} from '../models/index.model.js';


// Vista para crear grupo
const formNewGruop = async (req, res, next) =>{
    const categories = await Categories.findAll();

    res.render('admin/groups/new-group',{
        namePage: 'Crea un nuevo grupo',
        categories,
        data: req.flash("data")[0] || {}
    })
};

// Función para crear un nuevo grupo
const newGroup = async (req, res) => {
  const categories = await Categories.findAll();

  // Error de multer
  if (req.multerError) {
    req.flash("error", req.multerError);
    return res.render("admin/groups/new-group", {
      namePage: "Crea un nuevo grupo",
      categories,
      message: req.flash(),
      data: req.body
    });
  }

  // Validaciones
  await check("name")
    .notEmpty().withMessage("El nombre del grupo es obligatorio")
    .trim()
    .isLength({ min: 3, max: 100 }).withMessage("El nombre debe tener entre 3 y 100 caracteres")
    .toLowerCase()
    .escape()
    .run(req);

  await check("description")
    .notEmpty().withMessage("La descripción es obligatoria")
    .trim()
    .isLength({ min: 10, max: 500 }).withMessage("La descripción debe tener entre 10 y 500 caracteres")
    .run(req); // 👈 quitamos .escape() porque usamos striptags

  await check("category")
    .notEmpty().withMessage("Debes seleccionar una categoria")
    .isInt({ min: 1 }).withMessage("La categoria debe ser un número válido")
    .toInt()
    .run(req);

  await check("url")
    .optional()
    .trim()
    .isURL().withMessage("La URL no es válida")
    .toLowerCase()
    .run(req);

  // Verificar errores
  const result = validationResult(req);
  if (!result.isEmpty()) {
    result.array().forEach(err => req.flash("error", err.msg));
    return res.render("admin/groups/new-group", {
      namePage: "Crea un nuevo grupo",
      categories,
      message: req.flash(),
      data: req.body
    });
  }

  try {
    if (!req.user) {
      req.flash("error", "Debes iniciar sesión para crear un grupo");
      return res.redirect("/login");
    }

    // Extraer datos limpios
    const { name, category: id_category,
      
      
      url } = req.body;
    const description = striptags(req.body.description);
    const { id: id_user } = req.user;

    let image = null;
    if (req.file) {
      image = req.file.filename;
    }

    await Groups.create({
      name,
      description,
      image,
      url: url || null,
      id_category,
      id_user
    });

    req.flash("exito", "Se ha creado el grupo correctamente");
    return res.redirect("/dashboard");

  } catch (error) {
    console.error("❌ Error al crear grupo:", error);
    req.flash("error", error.message || "Hubo un error al crear el grupo");
    return res.redirect("/new-group");
  }
};


// vista para editar grupo
const formEditGroup = async (req, res, next) =>{
  // Extarer codigo del grupo
  const {code} = req.params;

  // Realizar consulta al mismo tiempo
  const consultas = [];
  consultas.push(Groups.findOne({where: {code}}));
  consultas.push(Categories.findAll());
  
  const [group, categories] = await Promise.all(consultas);

  // Si no existe el grupo
  if(!group){
    return res.redirect('/dashboard');
  }
  
  // Si existe el grupo, mostrar formulario
  res.render('admin/groups/edit-group',{
    namePage: `Editar grupo: ${group.name}`,
    categories,
    group,
  });
}


// Función para editar grupos
const editGroup = async (req, res, next) =>{
  // Extaer el codigo del grupo de la url
  const {code} = req.params;
  // Id del usuario que está logueado
  const {id} = req.user;
  // Buscar grupo mediante el código
  const group = await Groups.findOne({where: {code, id_user: id}});

  // Si no es el creador
  if(!group){
     req.flash('error', 'No eres el creador del grupo');
     res.redirect('/dashboard');
    return next();  
  }

  // Obtener valores del formulario
  const { name, category:id_category, url } = req.body;
  const description = striptags(req.body.description);

  // Asignar nuevos valores
  group.name = name;
  group.description = description;
  group.id_category = id_category;
  group.url = url;

  // Almacenar nuevos datos en la DB
  await group.save();
  req.flash('exito', `Grupo actualizado correctamente`);
  res.redirect('/dashboard');



};

export {formNewGruop, newGroup, formEditGroup, editGroup};
