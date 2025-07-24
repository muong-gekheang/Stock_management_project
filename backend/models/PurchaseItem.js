import { DataTypes } from 'sequelize';
import {sequelize} from '../config/db.js'; 

const PurchaseItem = sequelize.define('PurchaseItem', {
  PurchaseItemID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'PurchaseItemID'
  },
  PurchaseID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'PurchaseID'
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
  UnitCost: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'UnitCost'
  }
}, {
  tableName: 'PurchaseItem',
  timestamps: false
});

export default PurchaseItem
