import { DataTypes } from 'sequelize';
import {sequelize} from '../config/db.js'; 

const Supplier = sequelize.define('Supplier', {
    SupplierID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'SupplierID'
    },
    SupplierName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'SupplierName'
    },
    PhoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: 'PhoneNumber'
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
    tableName: 'Supplier',
    timestamps: false
  });



export default Supplier;