import Supplier from "../models/Supplier.js";

export const getUserSuppliers = async (req, res) => {
    const userId = req.user.UserID;
    const suppliers = await Supplier.findAll({
        where: { UserID: userId}
    })

    res.json(suppliers)
}

export const getUserSuppliersById = async (req, res) => {
    const userId = req.user.UserID;
    const supplierId = parseInt(req.params.supplierId, 10);
    if (isNaN(supplierId)) {
        return res.status(400).json({ message: "Invalid supplier ID" });
    }
    try {
        const supplier = await Supplier.findOne({
            where: {
                SupplierID: supplierId,
                UserID: userId
            }
        });

        if (!supplier) {
            return res.status(404).json({ message: "Supplier not found or unauthorized." });
        }

        return res.status(200).json(supplier);
    } catch (error) {
        console.error("Error fetching supplier by ID:", error);
        return res.status(500).json({ message: "Server error" });
    }
}

export const addNewSupplier = async (req, res) => {
    const { supplierName, phoneNumber } = req.body;
    const userId = req.user.UserID;

    try{
    
        if (!supplierName || supplierName.trim() === "") {
           return res.status(400).json({ message: "Supplier name name cannot be empty" });
        }

        if (!phoneNumber || phoneNumber.trim() === "") {
            return res.status(400).json({ message: "Phone number cannot be empty" });
        }

        const newSupplier = await Supplier.create({
            SupplierName: supplierName,
            PhoneNumber: phoneNumber,
            UserID: userId
        });
        return res.status(201).json({
        message: "Supplier created successfully",
        supplier: newSupplier
        });
    } catch( error ){
        console.error("Error adding supplier:", error);
        return res.status(500).json({ message: "Server error" });
    }
}

export const updateSupplier = async (req, res) => {
    const supplierId = parseInt(req.params.supplierId);
    const { supplierName, phoneNumber } = req.body;
    const userId = req.user.UserID;
    try {
        const supplier = await Supplier.findOne({
            where: {
                SupplierID: supplierId,
                UserID: userId
            }
        });

        if (!supplier) {
            return res.status(404).json({ message: "Supplier not found or unauthorized." });
        }

        supplier.SupplierName = supplierName || supplier.SupplierName;
        supplier.PhoneNumber = phoneNumber || supplier.PhoneNumber;

        await supplier.save();

        return res.status(200).json({
            message: "Supplier updated successfully.", supplier});
    } catch (error) {
        console.error("Error updating supplier:", error);
        return res.status(500).json({ message: "Server error" });
    }
}

export const deleteSupplier = async(req, res) => {
    const supplierId = parseInt(req.params.supplierId);
    const userId = req.user.UserID;

    try {
        const supplier = await Supplier.findOne({
            where: {
                SupplierID: supplierId,
                UserID: userId
            }
        });

        if (!supplier) {
            return res.status(404).json({ message: "Supplier not found or unauthorized." });
        }

        await supplier.destroy();

        return res.status(200).json({ message: "Supplier deleted successfully." });
    } catch (error) {
        console.error("Error deleting supplier:", error);
        return res.status(500).json({ message: "Server error" });
    }
}