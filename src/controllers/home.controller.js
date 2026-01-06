import { Categories, Meeties, Groups, Users } from "../models/index.model.js";
import moment from "moment";
import { Op } from "sequelize";

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
    moment
  });
};