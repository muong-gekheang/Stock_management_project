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

// add new categories
export const addCategory = async (req, res) =>{
    const {categoryName} = req.body;
    const userId = req.user.UserID;

    if(!categoryName || !categoryName.trim()){
        return res.status(400).json({ message: 'Category name is required' });
        
    }
    try{
        const newCategory = await Category.create({
            CategoryName: categoryName,
            UserID: userId,
        })
           res.status(201).json({ message: 'Category added successfully', category: newCategory });
        
    } catch(err){
        console.error('Error add new category', err);
        res.status(500).json({ message: 'Server error while adding category' });
        
    }
}