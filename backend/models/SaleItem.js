import { DataTypes } from 'sequelize';
import {sequelize} from '../config/db.js'; 

const SaleItem = sequelize.define('SaleItem', {
    SaleItemId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'SaleItemId'
    },
    SaleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'SaleId'
    },
    ProductID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'ProductID'
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'Quantity'
    },
    UnitPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: 'UnitPrice'
    }
  }, {
    tableName: 'Sale_Item',
    timestamps: false
  });

export default SaleItem;