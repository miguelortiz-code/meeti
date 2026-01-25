import { Categories, Meeties, Groups, Users } from "../models/index.model.js";
import moment from "moment";
import { Op, Sequelize } from "sequelize";

export const home = async (req, res) => {
  const queries = [];

  queries.push(Categories.findAll());

  queries.push(
    Meeties.findAll({
      attributes: ["slug", "title", "event_date", "hour"], // Columnas a mostrar
      where: {
        event_date: {
          [Op.gte]: moment(new Date()).format('YYYY-MM-DD') // GTE para >= en las fechas
        }
      },
      limit: 3,
      order: [["event_date", "ASC"]],
      include: [ // Join de groups and Users
        {
            model: Groups,
            attributes: ['image']
        },

                {
            model: Users,
            attributes: ['name', 'image']
        }
      ]
    })
  );

  const [categories, meeties] = await Promise.all(queries);

  res.render("home/index", {
    namePage: "Inicio",
    categories,
    meeties,
    moment,
  });
};

export const viewMeetiForSlug = async (req, res) =>{
  const {slug} = req.params; // Extraer SLug del Meeti por medio de la url

  const meeti  = await Meeties.findOne({where: {slug}, 
    include: [
      {
        model: Groups
      },
      {
        model: Users,
        attributes: ['id', 'name', 'image', 'code']
      }
    ]
  });

  // Si no existe meeti
  if(!meeti){
    res.redirect('/');
  }

  // Pasar el  resultado hacia la vista
  res.render('home/view-meeti', {
    namePage: meeti.title,
    meeti,
    moment,
    user: req.user || null 
  } )
  
}

// Función para confirmar asistencia de la reunión
export const confirmAttendance = async (req, res) =>{
 const { code } = req.params;

  const meeti = await Meeties.findOne({ where: { code } });

  if (!meeti) {
    return res.status(404).json({ message: 'Meeti no encontrado' });
  }

const { inputAction } = req.body;

  if (inputAction === 'confirm') {

    // Evitar duplicados SOLO al confirmar
    if (meeti.interesteds.includes(req.user.id)) {
      return res.status(400).json({ message: 'Ya estás registrado' });
    }

    await meeti.update({
      interesteds: Sequelize.fn(
        'array_append',
        Sequelize.col('interesteds'),
        req.user.id
      )
    });

    return res.send('Has confirmado tu asistencia');

  } else {

    // Cancelar asistencia
    if (meeti.interesteds.includes(req.user.id)) {
      await meeti.update({
        interesteds: Sequelize.fn(
          'array_remove',
          Sequelize.col('interesteds'),
          req.user.id
        )
      });
    }

    return res.send('Has cancelado tu asistencia');
  }
}

// Vista para mostar el listado de asistentes
export const viewAssistants = async(req, res) =>{
  const {slug} = req.params; // Extraer slug desde la url
  // Consultar Meeti mediante el slug
  const meeti = await Meeties.findOne({where: {slug}, attributes: ['interesteds', 'title', 'slug']});
  // Extraer interesados
  const {interesteds} = meeti
  const assistants = await Users.findAll({  
    attributes: ['name', 'image'],
    where: {id: interesteds}
  })
  
  // Mostrar vista
  res.render('home/view-assistants', {
    namePage: 'Listado de asistentes de la reunión',
    assistants,
    meeti
  })
}

// Vista para mostrar la información del usuario
export const viewUsers = async (req, res, next) =>{
  const {code} = req.params;

  // consultas al mismo tiempo
  const queries = [];

  queries.push(Users.findOne({where: {code}}))
  queries.push(Groups.findAll({where: {id_user: req.user.id}}));
  const [user, groups] = await Promise.all(queries);

  // Si no existe usuario
  if(!user){
    res.redirect('/');
    return next();
  }
  
  // Mostrar vista
  res.render('home/view-user',{
    namePage: `Perfil del usuario ${user.name}`,
    user,
    groups
  })
}

// Vista para mostrar grupo individual
export const viewGroup = async (req, res, next) => {
  const { code } = req.params;

  // Buscar el grupo
  const group = await Groups.findOne({ where: { code } });

  // Si no existe el grupo
  if (!group) {
    res.redirect('/');
    return next();
  }

  // Buscar los meetis del grupo
  const meeties = await Meeties.findAll({
    where: { id_group: group.id },
    order: [['event_date', 'ASC']]
  });

  // Renderizar vista
  res.render('home/view-group', {
    namePage: `Información del grupo ${group.group}`,
    group,
    meeties,
    moment
  });
};