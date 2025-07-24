import { DataTypes } from 'sequelize';
import {sequelize} from '../config/db.js'; 

const Purchase = sequelize.define('Purchase', {
  PurchaseID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'PurchaseID'
  },
  SupplierID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'SupplierID',
    references: {
        model: 'Supplier',
        key: 'SupplierID'
    }
    },
  PurchaseDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'PurchaseDate'
  },
  TotalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    field: 'TotalAmount'
  },
  UserID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'UserID'
  }
}, {
  tableName: 'Purchase',
  timestamps: false
});

export default Purchase