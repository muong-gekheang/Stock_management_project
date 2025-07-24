//import Product from '../models/Product.js';
//import Category from '../models/Category.js';
import db from '../models/index.js';
const { Category, Product } = db;

export const getUserProducts = async (req, res) => {
  try {
    console.log('req.user object in getUserProducts:', req.user);
    const userId = req.user.UserID;

    if (!userId) {
      console.log('UserID not found in req.user, sending 401.'); // <--- ADD THIS LINE
      return res.status(401).json({ message: 'Unauthorized: UserID missing from token payload' });
    }

    const products = await Product.findAll({
      where: { UserID: userId },
      include: [{ model: Category, attributes: ['CategoryName'] }],
      order: [['ProductName', 'ASC']]
    });

    console.log("Products fetched for user:", products);

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


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
      UserID: userId,
    });

    res.status(201).json({ message: 'Product created successfully', product });
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}
