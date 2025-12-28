import { DataTypes } from "sequelize";
import db from '../config/db.js'
import {Groups, Users} from '../models/index.model.js';

const  Meeties = db.define('meeties', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    code:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    slug:{
        type: DataTypes.STRING,
        allowNull: false
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    guest: DataTypes.STRING,
    quota: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    
    hour: {
        type: DataTypes.TIME,
        allowNull: false
    },

    country: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    zip_code: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    neighborhood: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    latitude: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    longitude: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    interesteds: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: []
    }
},{
  timestamps: true, //  crea automáticamente createdAt y updatedAt
  createdAt: 'created_At',
  updatedAt: 'updated_At',
  tableName: 'meeties'  // asegura que la tabla se llame exactamente "meeties"
});

Meeties.belongsTo(Users, {foreignKey: 'id_user'}); // Join con la tabla de usuarios
Meeties.belongsTo(Groups, {foreignKey: 'id_group'}); // Join con la tabla de grupos


export default Meeties