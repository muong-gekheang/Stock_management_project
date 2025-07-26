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


export const createUserProduct = async (req, res ) => {
  const userId = req.user.UserID;
  const productId = parseInt(req.params.productId);
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

export const updateProduct = async(req, res) => {
  const userId = req.user.UserID;
  const productId = parseInt(req.params.productId);
  const {
    productName,
    categoryId,
    importedPrice,
    sellingPrice,
    quantity,
    lowStockThreshold,
  } = req.body;

  try{
    const product = await Product.findOne({
      where: { ProductID: productId },
      include: [{
        model: Category,
        where: { UserID: userId } // ensures user owns this product's category
      }]
    });

    if(!product){
      return res.status(404).json({message: "Product not found"})
    }

    product.ProductName = productName || product.ProductName;
    product.CategoryId = categoryId || product.CategoryId;
    product.PurchasePrice = importedPrice || product.PurchasePrice;
    product.SalePrice = sellingPrice || product.SalePrice;
    product.CurrentStock = quantity || product.CurrentStock;
    product.MinStockLevel = lowStockThreshold || product.MinStockLevel;
    
    await product.save();
    return res.json({ message: "Product updated successfully", product });

  }catch ( error ){
    console.error("Product update failed");
    return res.status(500).json({ message: "Product update failed", error: error.message });
  }

}

export const deleteProduct = async (req, res) => {
  const userId = req.user.UserID;
  const productId = parseInt(req.params.productId);
  try{
    const product = await Product.findOne({
      where: { ProductID: productId },
      include: [{
        model: Category,
        where: { UserID: userId } // ensures user owns this product's category
      }]
    });

    if(!product){
      return res.status(404).json({message: "Product not found"})
    }

    await product.destroy();
    return res.json({ message: "Product deleted successfully" });
  } catch ( error ) {
    console.error("Product deletion failed:", error);
    return res.status(500).json({ message: "Product deletion failed", error: error.message });
  }

}