import { DataTypes } from "sequelize";
import db from '../config/db.js';
import {Users, Meeties} from '../models/index.model.js';

const Comments = db.define('comments', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    message: DataTypes.TEXT
},{
    timestamps: true,
    createdAt: 'created_At',
    updatedAt: 'updated_At',
    tableName: 'comments'  // asegura que la tabla se llame exactamente "comments"

});

Comments.belongsTo(Users, {foreignKey: 'id_user'}) // Join uno a uno con la tabla Usuarios
Comments.belongsTo(Meeties, {foreignKey: 'id_meeti'}) // Join uno a uno con la tabla Meeti´s


export default Comments