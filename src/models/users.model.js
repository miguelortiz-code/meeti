import {DataTypes, UUIDV4} from 'sequelize';
import db from '../config/db.js';

const Users = db.define('users',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    code: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
    },

    name: {
        type: DataTypes.STRING(80),
        allowNull: false,
    },

    description: DataTypes.TEXT,
    
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    active: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },

    image: DataTypes.STRING,
    token: DataTypes.STRING,
    expiraToken: DataTypes.DATE
},{
  timestamps: true, //  crea automáticamente createdAt y updatedAt
  createdAt: 'created_At',
  updatedAt: 'updated_At',
  tableName: 'users'  // asegura que la tabla se llame exactamente "users"
}
);

export default Users;