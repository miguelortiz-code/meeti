import {DataTypes} from 'sequelize';
import db from '../config/db.js';

const Categories = db.define('category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    category: {
        type: DataTypes.STRING
    }
},{
  timestamps: true, //  crea automáticamente createdAt y updatedAt
  createdAt: 'created_At',
  updatedAt: 'updated_At',
  tableName: 'categories'  // asegura que la tabla se llame exactamente "categories"
});

export default Categories