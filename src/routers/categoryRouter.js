import express from 'express' //sử dụng cú pháp import thay vì require do đã khai báo "type": "module" trong package.json
import {getAllCategories, findCategoryById, createCategory, updateCategory, deleteCategoryById} from '../controllers/categoryController.js';
import {verifyAccessToken, requireAdmin} from '../controllers/verifyAccessToken.js';
const categoryRouter = express.Router() // Tạo một Router cho danh mục
// cấu hình router
categoryRouter.get('/',getAllCategories);
categoryRouter.get('/:categoryId',findCategoryById); // tìm danh mục theo ID
// thêm sửa xoá phải là admin mới có quyền
categoryRouter.post('/', verifyAccessToken ,requireAdmin , createCategory); // tạo mới danh mục
categoryRouter.put('/:categoryId', verifyAccessToken, requireAdmin, updateCategory); // cập nhật danh mục theo ID
categoryRouter.delete('/:categoryId', verifyAccessToken, requireAdmin, deleteCategoryById); // xóa danh mục theo ID

export default categoryRouter;