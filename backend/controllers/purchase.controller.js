import Purchase from '../models/Purchase.js';
import PurchaseItem from '../models/PurchaseItem.js';
import Product from '../models/Product.js';
import Supplier from '../models/Supplier.js';

export const getUserPurchases = async (req, res) => {
  try {
    const userId = req.user.UserID;
    const purchases = await Purchase.findAll({
      where: { UserID: userId },
      include: [
        {
          model: PurchaseItem,
          include: [Product]
        },
        {
          model: Supplier,
          as: 'Supplier'
        }
      ],
      order: [['PurchaseDate', 'DESC']]
    });

    res.json({ purchases });
  } catch (error) {
    console.error('Error fetching purchases:', error);
    res.status(500).json({ error: 'Failed to fetch purchases.' });
  }
};

export const createPurchase = async (req, res) => {
  const userId = req.user.UserID;
  const { supplierId, date, items } = req.body;

  try {
    const totalAmount = items.reduce((sum, item) => {
      const qty = parseInt(item.quantity);
      const cost = parseFloat(item.unitCost);
      return sum + (qty * cost);
    }, 0);

    // 1. Create Purchase
    const newPurchase = await Purchase.create({
      SupplierID: supplierId,
      PurchaseDate: date,
      TotalAmount: totalAmount.toFixed(2),
      UserID: userId
    });

    // 2. Create Purchase Items
    const purchaseItems = items.map(item => ({
      PurchaseID: newPurchase.PurchaseID,
      ProductID: item.productId,
      Quantity: item.quantity,
      UnitCost: item.unitCost
    }));

    // 3. Update Product PurchasePrice
    for (const item of items) {
      const product = await Product.findByPk(item.productId);
      if (product) {
         product.PurchasePrice = item.unitCost;
        product.CurrentStock = parseInt(product.CurrentStock, 10) + item.quantity;
        await product.save();
      }
    }

    // 4. Insert Purchase Items
    await PurchaseItem.bulkCreate(purchaseItems);

    return res.json({ message: 'Purchase recorded successfully' });
  } catch (error) {
    console.error('Error creating Purchase:', error);
    return res.status(500).json({ error: 'Failed to record Purchase.' });
  }
};


