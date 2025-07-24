import { Op, Sequelize } from "sequelize";
import db from '../models/index.js';
const { Sale, SaleItem, Product } = db;


// Helper to get start of today
const getTodayStart = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
};

// Helper to get Monday and Sunday of current week (Monday = day 1)
const getWeekRange = () => {
  const now = new Date();
  const day = now.getDay(); // Sunday=0, Monday=1 ...
  // Calculate Monday
  const monday = new Date(now);
  monday.setDate(now.getDate() - (day === 0 ? 6 : day - 1));
  monday.setHours(0, 0, 0, 0);

  // Calculate Sunday
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  return { monday, sunday };
};

export async function getDashboardStats(req, res) {
  try {
    console.log("Dashboard request started");
    const userId = req.user.UserID;

    // Get total products for this user
    const totalProducts = await Product.count({
      where: { UserID: userId },
    });

    // Get products with low stock alerts
    const lowStockProducts = await Product.findAll({
      where: {
        UserID: userId,
        CurrentStock: {
          [Op.lte]: Sequelize.col("MinStockLevel"),
        },
      },
      attributes: ["ProductID", "ProductName", "CurrentStock", "MinStockLevel"],
    });

    // Get today's start and end time
    const todayStart = getTodayStart();
    const todayEnd = new Date(todayStart);
    todayEnd.setHours(23, 59, 59, 999);

    // Get today's sales for user (Sales made today)
    const salesToday = await Sale.findAll({
      where: {
        UserID: userId,
        OrderDate: {
          [Op.between]: [todayStart, todayEnd],
        },
      },
      include: [{
        model: SaleItem,
        as: 'SaleItems', 
        required: true,
      }],
    });

    // Calculate total orders today (number of Sales)
    const totalOrdersToday = salesToday.length;

    // Calculate total sales amount today (sum of TotalAmount)
    let salesAmountToday = salesToday.reduce(
      (sum, sale) => sum + (parseFloat(sale.TotalAmount) || 0),
      0
    );
    salesAmountToday = parseFloat(salesAmountToday.toFixed(2));

    // Calculate profit today (sum of (SalePrice - PurchasePrice) * Quantity for today)
    // Need to join SaleItem and Product to get prices
    const saleItemsToday = await SaleItem.findAll({
      include: [
        {
          model: Sale,
          as: 'Sale',
          where: {
            UserID: userId,
            OrderDate: {
              [Op.between]: [todayStart, todayEnd],
            },
          },
          required: true,
        },
        {
          model: Product,
          as: 'Product',
          where: { UserID: userId },
          required: true,
        },
      ],
    });

    let profitToday = 0;
    for (const item of saleItemsToday) {
      const purchasePrice = parseFloat(item.Product.PurchasePrice);
      const unitPrice = parseFloat(item.UnitPrice);
      const qty = item.Quantity;
      profitToday += (unitPrice - purchasePrice) * qty;
    }
    
    profitToday = parseFloat(profitToday.toFixed(2));

    // Get current week range Mon-Sun
    const { monday, sunday } = getWeekRange();

    // Get sales for this week with SaleItems and Products for logged in user
    const weeklySaleItems = await SaleItem.findAll({
      include: [
        {
          model: Sale,
          as: 'Sale',
          where: {
            UserID: userId,
            OrderDate: {
              [Op.between]: [monday, sunday],
            },
          },
          required: true,
        },
        {
          model: Product,
          as: 'Product',
          where: { UserID: userId },
          required: true,
        },
      ],
    });

    // Aggregate total revenue and profit for the week
    let totalWeeklyRevenue = 0;
    let totalWeeklyProfit = 0;

    // Also calculate daily sales for each day of week (Mon=1,...Sun=0)
    const salesPerDay = {
      Mon: 0,
      Tue: 0,
      Wed: 0,
      Thu: 0,
      Fri: 0,
      Sat: 0,
      Sun: 0,
    };

    weeklySaleItems.forEach((item) => {
      const orderDate = new Date(item.Sale.OrderDate);
      const dayOfWeek = orderDate.getDay(); // Sunday=0

      const revenue = item.UnitPrice * item.Quantity;
      const purchaseCost = item.Product.PurchasePrice * item.Quantity;
      const profit = revenue - purchaseCost;

      totalWeeklyRevenue += revenue;
      totalWeeklyProfit += profit;

      switch (dayOfWeek) {
        case 1: salesPerDay.Mon += revenue; break;
        case 2: salesPerDay.Tue += revenue; break;
        case 3: salesPerDay.Wed += revenue; break;
        case 4: salesPerDay.Thu += revenue; break;
        case 5: salesPerDay.Fri += revenue; break;
        case 6: salesPerDay.Sat += revenue; break;
        case 0: salesPerDay.Sun += revenue; break;
      }
    });

    // Send JSON response
    res.json({
      weeklySales: {
        revenue: totalWeeklyRevenue,
        profit: totalWeeklyProfit,
        range: {
          from: monday.toISOString().split("T")[0],
          to: sunday.toISOString().split("T")[0],
        },
        dailySales: [
          Math.round(salesPerDay.Mon),
          Math.round(salesPerDay.Tue),
          Math.round(salesPerDay.Wed),
          Math.round(salesPerDay.Thu),
          Math.round(salesPerDay.Fri),
          Math.round(salesPerDay.Sat),
          Math.round(salesPerDay.Sun),
        ],
      },
      totalProducts,
      today: {
        totalOrders: totalOrdersToday,
        profit: profitToday,
        salesAmount: salesAmountToday,
      },
      lowStockAlerts: lowStockProducts,
    });
  } catch (error) {

    console.error("Dashboard controller error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
