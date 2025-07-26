// controllers/sales.controller.js
import Sale from '../models/Sale.js';
import SaleItem from '../models/SaleItem.js';
import Product from '../models/Product.js';

export const getUserSales = async (req, res) => {
  try {
    const userId = req.user.UserID;
    
    const sales = await Sale.findAll({
      where: { UserID: userId },
      include: [
        {
          model: SaleItem,
          as: 'SaleItems',
          include: [
            {
              model: Product,
              as: 'Product',
              attributes: ['ProductID', 'ProductName'] // Only get necessary product info
            }
          ]
        }
      ],
      order: [['OrderDate', 'DESC']]
    });

    res.json({ sales });
  } catch (error) {
    console.error('Error fetching sales:', error);
    res.status(500).json({ error: 'Failed to fetch sales.' });
  }
};

export const createSale = async(req, res) => {
  const userId = req.user.UserID
  const { customerName, date, items } = req.body;

  try {
    const totalAmount = items.reduce((sum, item) => {
      const qty = parseInt(item.quantity)
      const price = parseFloat(item.unitPrice);
      return sum + (qty * price);
    }, 0)

    // 1. Create Sale
    const newSale = await Sale.create({
      CustomerName: customerName,
      OrderDate: date,
      TotalAmount: totalAmount.toFixed(2),
      UserID: userId
    });

    // 2. Create Sale Items
    const saleItems = items.map((item) => ({
      SaleId: newSale.SaleId,
      ProductID: item.productId,
      Quantity: item.quantity,
      UnitPrice: item.unitPrice
    }));

    // 3. Reduce product stock
    for (const item of items) {
      const product = await Product.findByPk(item.productId)
      if(product.CurrentStock < item.quantity) {
        return res.status(400).json({
          error: `Not enough stock for "${product.ProductName}". Available: ${product.CurrentStock}, requested: ${item.quantity}.`,
        });
      }
      product.CurrentStock -= item.quantity
      await product.save()
    }

    await SaleItem.bulkCreate(saleItems);

    return res.json({ message: 'Sale recorded successfully'})
  } catch (error) {
    console.error('Error creating sale:', error);
    return res.status(500).json({ error: 'Failed to record sale.' });
  }
}

