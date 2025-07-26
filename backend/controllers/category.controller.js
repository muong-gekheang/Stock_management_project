import Category from "../models/Category.js";

//get category of user
export const getCategories = async (req, res) => {
    const userId = req.user.UserID;

    try {
        const categories = await Category.findAll({
        attributes: ['CategoryID', 'CategoryName'],
        where: { UserID: userId}
    })
    
    res.json({ categories })
    } catch (err) {
        console.error('Error fetching categories:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// add new category
export const addCategory = async(req, res) => {
    const userId = req.user.UserID;

    try{
        const { categoryName } = req.body;

        if (!categoryName || categoryName.trim() === "") {
        return res.status(400).json({ message: "Category name cannot be empty" });
        }

        const newCategory = await Category.create({
            CategoryName: categoryName,
            UserID: userId
        });
        return res.status(201).json({
        message: "Category created successfully",
        category: newCategory
        });
    } catch( error ){
        console.error("Error adding category:", error);
        return res.status(500).json({ message: "Server error" });
    }
}