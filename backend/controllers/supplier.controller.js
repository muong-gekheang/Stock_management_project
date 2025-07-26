import Supplier from "../models/Supplier.js";

export const getUserSuppliers = async (req, res) => {
    const userId = req.user.UserID;
    const suppliers = await Supplier.findAll({
        where: { UserID: userId}
    })

    res.json(suppliers)
}