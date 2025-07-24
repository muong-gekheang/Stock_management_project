import { DataTypes } from 'sequelize';
import {sequelize} from '../config/db.js'; 
import Sequelize from 'sequelize';

const Inventory_Transaction = sequelize.define('Inventory_Transaction', {
    TransactionID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'TransactionID'
    },
    ProductID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'ProductID'
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'UserID'
    },
    SupplierID: {
      type: DataTypes.INTEGER,
      allowNull: true, 
      field: 'SupplierID'
    },
    QuantityChange: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'QuantityChange'
    },
    TransactionType: {
      type: DataTypes.ENUM('IN', 'OUT', 'ADJUST', 'RETURN'),
      allowNull: false,
      field: 'TransactionType'
    },
    TransactionDate: {
      type: DataTypes.DATE, 
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'TransactionDate'
    }
  }, {
    tableName: 'Inventory_Transaction',
    timestamps: false
  });

export default Inventory_Transaction;