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