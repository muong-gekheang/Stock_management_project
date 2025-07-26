import { DataTypes } from 'sequelize';
import {sequelize} from '../config/db.js'; 

const Product = sequelize.define('Product', {
    ProductID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'ProductID'
    },
    ProductName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'ProductName'
    },
    CategoryID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'CategoryID'
    },
    PurchasePrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: 'PurchasePrice'
    },
    SalePrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: 'SalePrice'
    },
    CurrentStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'CurrentStock'
    },
    MinStockLevel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'MinStockLevel'
    },
    ImageURL: {
      type: DataTypes.TEXT,
      field: 'ImageURL'
    }
  }, {
    tableName: 'Product',
    timestamps: false
  });

export default Product;