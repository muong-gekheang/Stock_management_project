import Sale from "../models/Sale.js";
import SaleItem from "../models/SaleItem.js";
import Product from "../models/Product.js";

export const getUserSales = async (req, res) => {
  try {
    const userId = req.user.UserID;

    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const sales = await Sale.findAll({
        where: { UserID: userId },
        include: [
            {
            model: SaleItem,
            as: 'SaleItems',
            include: [
                {
                model: Product,
                as: 'Product'
                }
            ]
            }
        ],
        order: [['OrderDate', 'DESC']]
    });


    res.status(200).json(sales);
  } catch (error) {
    console.error("Fetch sale error:", error);
    res.status(500).json({ message: "Server error" });
  }
};