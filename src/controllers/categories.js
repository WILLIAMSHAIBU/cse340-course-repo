import { getAllCategories, getCategoryDetails, getProjectsByCategoryId } from '../models/categories.js';

export const showCategoriesPage = async (req, res) => {
    const title = 'Service Project Categories';

    try {
        const categories = await getAllCategories();
        res.render('categories', { title, categories });
    } catch (error) {
        console.error('Failed to load categories:', error.message);
        res.render('categories', { title, categories: [] });
    }
};

export const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    const categoryDetails = await getCategoryDetails(categoryId);
    const projects = await getProjectsByCategoryId(categoryId);
    const title = 'Category Details';

    res.render('category', { title, categoryDetails, projects });
};
