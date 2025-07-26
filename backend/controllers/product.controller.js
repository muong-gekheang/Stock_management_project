import db from '../models/index.js';
import { Op, col } from 'sequelize';
const { Category, Product } = db;

export const getUserProducts = async (req, res) => {
  try {
    const userId = req.user.UserID;

    if (!userId) {
      console.log('UserID not found in req.user, sending 401.'); // <--- ADD THIS LINE
      return res.status(401).json({ message: 'Unauthorized: UserID missing from token payload' });
    }

    const products = await Product.findAll({
      include: [{
        model: Category,
        attributes: ['CategoryName'],
        where: { UserID: userId}
      }],
      order: [['ProductName', 'ASC']]
    })

    console.log("Products fetched for user:", products);

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getLowStockProducts = async (req, res) => {
  try {
    const userId = req.user.UserID;

    if (!userId) {
      console.log('UserID not found in req.user, sending 401.'); // <--- ADD THIS LINE
      return res.status(401).json({ message: 'Unauthorized: UserID missing from token payload' });
    }

    const products = await Product.findAll({
      where: { 
        [Op.and]: [
          // CurrentStock <= MinStockLevel
          {
            CurrentStock: {
              [Op.lte]: col('MinStockLevel')
            }
          }
        ]
      },
      include: [{
        model: Category,
        attributes: ['CategoryName'],
        where: { UserID: userId}
      }],
      order: [['ProductName', 'ASC']]
    })

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getProductByID = async(req, res) => {
  const productId = parseInt(req.params.id, 10);
  // Validate product ID
  if (isNaN(productId)) {
    return res.status(400).json({ error: 'Invalid product ID provided.' });
  }

  try {
    const product = await Product.findByPk(productId)
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    res.json(product)
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal server error while fetching product.' });
  }
}


export const createUserProduct = async (req, res ) => {
  const userId = req.user.UserID;
  const {
    productName,
    categoryId,
    purchasePrice,
    salePrice,
    currentStock,
    minStockLevel,
    imageUrl,
  } = req.body;

  try {
    const product = await Product.create({
      ProductName: productName,
      CategoryID: categoryId,
      PurchasePrice: purchasePrice,
      SalePrice: salePrice,
      CurrentStock: currentStock,
      MinStockLevel: minStockLevel,
      ImageURL: imageUrl,
    });

    res.status(201).json({ message: 'Product created successfully', product });
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}
