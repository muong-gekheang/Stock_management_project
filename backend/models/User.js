import { DataTypes } from 'sequelize';
import {sequelize} from '../config/db.js'; 

const User = sequelize.define('User', {
  UserID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'UserID',
  },
  Username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'Username',
  },
  Email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'Email',
  },
  Password: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'Password',
  },
  StoreName: {
    type: DataTypes.STRING(100),
    allowNull: true,
    field: 'StoreName',
  },
  StoreCategory: {
    type: DataTypes.STRING(100),
    allowNull: true,
    field: 'StoreCategory',
  },
  JoinDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'JoinDate',
  },
  ImageURL: {
    type: DataTypes.STRING(255),
    allowNull: true,
    field: 'ImageURL',
  },
}, {
  tableName: 'User',
  timestamps: false,
});

export default User;
