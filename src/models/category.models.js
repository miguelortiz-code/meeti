import {DataTypes} from 'sequelize';
import {db} from '../config/db.js';

const Categories = db.define(
    'categories',
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        category : DataTypes.STRING
    },
    {
        tableName: "categories",
        timestamps: true,
    }
)

export default Categories;