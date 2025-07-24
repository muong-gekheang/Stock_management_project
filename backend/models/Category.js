import { DataTypes } from 'sequelize';
import {sequelize} from '../config/db.js'; 

const Category = sequelize.define('Category', {
    CategoryID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'CategoryID'
    },
    CategoryName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'CategoryName'
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'UserID',
      references: {
        model: 'User',
        key: 'UserID'
      }
    }
  }, {
    tableName: 'Category',
    timestamps: false
  });

export default Category;