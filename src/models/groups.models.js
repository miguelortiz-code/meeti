import {DataTypes} from 'sequelize';
import db from '../config/db.js';
import {Categories, Users} from  '../models/index.model.js';

const Groups = db.define('groups', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    code: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },

    group: {
        type: DataTypes.STRING(80),
        allowNull: false
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    url: DataTypes.TEXT,
    image: DataTypes.STRING
},{
  timestamps: true, //  crea automáticamente createdAt y updatedAt
  createdAt: 'created_At',
  updatedAt: 'updated_At',
  tableName: 'groups'  // asegura que la tabla se llame exactamente "groups"
});

Groups.belongsTo(Categories, {foreignKey: 'id_category'} );  // Join Con la tabla categorias
Groups.belongsTo(Users, {foreignKey: 'id_user'}); // join con la tabla de usuarios

export default Groups