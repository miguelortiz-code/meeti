import striptags from "striptags";
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
  let quota = req.body.quota;
  const { id: id_user } = req.user;
  const { grupoId, title, guest, date, hour, country, city, zip_code, address, neighborhood, latitude, longitude} = req.body;

  // Cupo
  if (!quota || quota === "") {
    quota = 0;
  } else {
    quota = Number(quota);
  }
};
