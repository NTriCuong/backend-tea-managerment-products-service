import express from 'express' //sử dụng cú pháp import thay vì require do đã khai báo "type": "module" trong package.json
import {getAllCategories, findCategoryById, createCategory, updateCategory, deleteCategoryById} from '../controllers/categoryController.js';

const categoryRouter = express.Router() // Tạo một Router cho danh mục
// cấu hình router
categoryRouter.get('/',getAllCategories); // Định nghĩa route lấy danh sách danh mục
categoryRouter.get('/:categoryId',findCategoryById); // tìm danh mục theo ID
categoryRouter.post('/', createCategory); // tạo mới danh mục
categoryRouter.put('/:categoryId',updateCategory); // cập nhật danh mục theo ID
categoryRouter.delete('/:categoryId',deleteCategoryById); // xóa danh mục theo ID

export default categoryRouter;