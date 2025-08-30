import { DataTypes } from 'sequelize';
import { db } from '../config/db.js';
import { Categories, Users } from '../models/index.model.js';

const Groups = db.define(
  'groups',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    url: DataTypes.TEXT,
    image: DataTypes.TEXT,
  },
  {
    tableName: 'groups',
    timestamps: true,
  }
);

// Relaciones
Groups.belongsTo(Categories, { foreignKey: "id_category" });
Groups.belongsTo(Users, { foreignKey: "id_user" });

export default Groups;
