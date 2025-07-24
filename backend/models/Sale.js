import { DataTypes } from 'sequelize';
import {sequelize} from '../config/db.js'; 
import Sequelize from 'sequelize';

const Sale = sequelize.define('Sale', {
    SaleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'SaleId'
    },
    CustomerName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'CustomerName'
    },
    OrderDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'OrderDate'
    },
    TotalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: 'TotalAmount'
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
    tableName: 'Sale',
    timestamps: false
  });

export default Sale;