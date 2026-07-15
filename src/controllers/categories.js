import { getAllCategories } from '../models/categories.js';

export const showCategoriesPage  = async (req, res) => {
    const title = 'Service Project Categories';

    try {
        const categories = await getAllCategories();
        res.render('categories', { title, categories });
    } catch (error) {
        console.error('Failed to load categories:', error.message);
        res.render('categories', { title, categories: [] });
    }
};
