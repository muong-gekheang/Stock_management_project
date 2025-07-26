import { sequelize } from '../config/db.js';

import User from './User.js';
import Supplier from './Supplier.js';
import Category from './Category.js';
import Product from './Product.js';
import Inventory_Transaction from './Inventory_Transaction.js';
import Sale from './Sale.js';
import SaleItem from './SaleItem.js';
import Purchase from './Purchase.js';
import PurchaseItem from './PurchaseItem.js';
// ========== Associations ==========

// -----------------------
// USER RELATIONSHIPS
// -----------------------
User.hasMany(Supplier, { foreignKey: 'UserID' });
User.hasMany(Category, { foreignKey: 'UserID' });
User.hasMany(Inventory_Transaction, { foreignKey: 'UserID' });
User.hasMany(Purchase, { foreignKey: 'UserID' });
User.hasMany(Sale, { foreignKey: 'UserID' });

Supplier.belongsTo(User, { foreignKey: 'UserID' });
Category.belongsTo(User, { foreignKey: 'UserID' });
Inventory_Transaction.belongsTo(User, { foreignKey: 'UserID' });
Purchase.belongsTo(User, { foreignKey: 'UserID' });
Sale.belongsTo(User, { foreignKey: 'UserID' });

// -----------------------
// PRODUCT RELATIONSHIPS
// -----------------------
Product.belongsTo(Category, { foreignKey: 'CategoryID' });
Category.hasMany(Product, { foreignKey: 'CategoryID' });

Product.hasMany(Inventory_Transaction, { foreignKey: 'ProductID' });
Inventory_Transaction.belongsTo(Product, { foreignKey: 'ProductID' });

Product.hasMany(SaleItem, { foreignKey: 'ProductID' });
SaleItem.belongsTo(Product, { foreignKey: 'ProductID', as: 'Product' });

Product.hasMany(PurchaseItem, { foreignKey: 'ProductID' });
PurchaseItem.belongsTo(Product, { foreignKey: 'ProductID' });

// -----------------------
// SALE RELATIONSHIPS
// -----------------------
Sale.hasMany(SaleItem, { foreignKey: 'SaleId', as: 'SaleItems' });
SaleItem.belongsTo(Sale, { foreignKey: 'SaleId', as: 'Sale' });

// -----------------------
// PURCHASE RELATIONSHIPS
// -----------------------
Purchase.hasMany(PurchaseItem, { foreignKey: 'PurchaseID' });
PurchaseItem.belongsTo(Purchase, { foreignKey: 'PurchaseID' });

// In models/purchase.js or model index.js

Purchase.belongsTo(Supplier, { foreignKey: 'SupplierID', as: 'Supplier'});

Supplier.hasMany(Purchase, { foreignKey: 'SupplierID', as: 'Purchases'});

// -----------------------
// INVENTORY RELATIONSHIPS
// -----------------------
Inventory_Transaction.belongsTo(Supplier, { foreignKey: 'SupplierID' });
Supplier.hasMany(Inventory_Transaction, { foreignKey: 'SupplierID' });

// ========== Export All Models ==========

const db = {
  sequelize,
  User,
  Supplier,
  Category,
  Product,
  Inventory_Transaction,
  Sale,
  SaleItem,
  Purchase,
  PurchaseItem
};

export default db;  


