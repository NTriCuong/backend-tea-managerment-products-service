import {getCategories, getCategoryById, postCategory,putCategory, deleteCategory} from '../models/categoryModel.js';

const getAllCategories = async (req, res) => {
    try {
        const categories = await getCategories();  // gọi model
        return res.status(200).json(categories);         // gửi response 
  } catch (error) {
        console.error('get all category error:', error);
        return res.status(500).json({
        message: 'Lỗi server',
        error: error.message,
        });
  }
}
const findCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const category = await getCategoryById(categoryId);
        if (category.length === 0) { // nếu không tìm thấy trong db
            return res.status(404).json({ message: 'Không tìm thấy danh mục' });
        }
        return res.status(200).json(category);

    } catch (error) {
        console.error('get category by id error:', error); // nếu không truy cập được db
        return res.status(500).json({
        message: 'Lỗi server',
        error: error.message,
        });
    }
}
const createCategory = async (req, res) => {
    try{
        const data = req.body;
        await postCategory(data);
        return res.status(201).json({message: 'Thêm thành công'});
    } catch (error) {
        console.error('create category error:', error); // nếu không truy cập được db
        return res.status(500).json({
        message: 'Lỗi server',
        error: error.message,
        });
    }
}
const updateCategory = async (req, res) => {
    try{
        const categoryId = req.params.categoryId; // lấy categoryId từ params
        const data = req.body;
        await putCategory(categoryId, data);
        return res.status(200).json({message: 'Cập nhật thành công'});
    } catch (error) {
        console.error('update category error:', error); // nếu không truy cập được db
        return res.status(500).json({
        message: 'Lỗi server',
        error: error.message,
        });
    }
} 
const deleteCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        await deleteCategory(categoryId);
        return  res.status(200).json({ message: 'Xóa danh mục thành công' });
    } catch (error) {
        console.error('delete category by id error:', error); // nếu không truy cập được db
        return res.status(500).json({
        message: 'Lỗi server',
        error: error.message,
        });
    }
}

export {getAllCategories, findCategoryById, createCategory, updateCategory, deleteCategoryById};