import striptags from "striptags";
import slug from "slug";
import shortid from "shortid";
import {check, validationResult} from 'express-validator';
import { Groups, Meeties } from "../models/index.model.js";

// Mostrar la vista del meeti
export const viewNewMeeti = async (req, res) => {
  const groups = await Groups.findAll({ where: { id_user: req.user.id } });

  res.render("meeties/new-meeti", {
    namePage: "Crear tu Meeti",
    groups,
    data: {},
  });
};

// Función  para crear un nuevo meeti
export const newMeetie = async (req, res, next) => {
  // Obtener Datos
  const description = striptags(req.body.description).trim();
  
  // Validaciones del formulario

  await check('grupoId')
  .trim()
  .escape()
  .notEmpty()
  .withMessage('El grupo no puede ir vacio')
  .run(req)

  await check('title')
  .trim()
  .escape()
  .notEmpty()
  .withMessage('El titulo de la reunión no puede ir vacio')
  .isLength({min_: 5})
  .withMessage('El Meeti debe tener mínimo 5 caracteres')
  .run(req);

  await check('guest')
  .trim()
  .escape()
  .run(req)

  await check('date')
  .trim()
  .escape()
  .notEmpty()
  .withMessage('Debes ingresar una fecha para la reunión')
  .run(req)
  
  await check('hour')
  .trim()
  .escape()
  .notEmpty()
  .withMessage('Debes ingresar una hora para la reunión')
  .run(req)

  await check("description")
  .trim()
  .notEmpty()
  .withMessage("La descripción no puede ir vacía")
  .isLength({ min: 15 })
  .withMessage("La descripción debe tener mínimo 15 caracteres")
  .run(req);

  await check('country')
  .trim()
  .escape()
  .notEmpty()
  .withMessage('El pais es obligatorio')
  .run(req);

  await check('city')
  .trim()
  .escape()
  .notEmpty()
  .withMessage('La ciudad es obligaria')  
  .run(req);

  await check('zip_code')
  .trim()
  .escape()
  .notEmpty()
  .withMessage('El código postal no puede ir vacio')
  .run(req);

  await check('address')
  .trim()
  .escape()
  .notEmpty()
  .withMessage('La dirección no puede ir vacia')
  .run(req);

  await check('neighborhood')
  .trim()
  .escape()
  .notEmpty()
  .withMessage('El nombre del barrio no puede ir vacio')
  .run(req);
  
  await check('latitude')
  .trim()
  .escape()
  .run(req);
  
  await check('longitude')
  .trim()
  .escape()
  .run(req);

  // Obtener los errores de validacion
  const result = validationResult(req);

  if(!result.isEmpty()){
    // Agregar cada error como un mensaje flash independiente
    result.array().forEach((err) => req.flash("error", err.msg));

    // Volver a cargar los grupos
    const groups = await Groups.findAll({ where: { id_user: req.user.id } });

    // Mostrar nuevamente los errores
    return res.render("meeties/new-meeti", {
      namePage: "Crear tu Meeti",
      groups,
      messages: req.flash(),
      data: (req.session.formData = req.body),
    });
  }

  // Si no hay errores
  let quota = req.body.quota;
  const { id: id_user } = req.user;
  const { grupoId, title, guest, date, hour, country, city, zip_code, address, neighborhood, latitude, longitude} = req.body;
  // Cupo
  if (!quota || quota === "") {
    quota = 0;
  } else {
    quota = Number(quota);
  }

  // Slug del meeti
  const url = slug(title).toLowerCase();
  const slugMeeti = `${url}-${shortid.generate()}`;

  // Almacenar en la BD
  try {
    await Meeties.create({
      id_group: grupoId,
      slug: slugMeeti,
      title,
      guest,
      date,
      hour,
      description,
      country,
      city,
      zip_code,
      address,
      neighborhood,
      latitude,
      longitude,
      id_user,
    });

    req.flash('exito', 'Meeti creado correctamente');
    res.redirect('/dashboard')
  } catch (error) {
    console.log(error);
    req.flash("error", error);
    res.redirect("/meeties/new-meeti");
  }
};
