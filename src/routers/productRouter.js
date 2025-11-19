import express from 'express' //sử dụng cú pháp import thay vì require do đã khai báo "type": "module" trong package.json
import {getAllProducts, findProductById, createProduct, updateProduct, deleteProductById} from '../controllers/productController.js';
const productRouter = express.Router() // Tạo một Router cho sản phẩm
// cấu hình router
productRouter.get('/',getAllProducts); // Định nghĩa route lấy danh sách sản phẩm
productRouter.get('/:productCode',findProductById); // tim
productRouter.post('/', createProduct); // tạo mới sản phẩm
productRouter.put('/:productCode',updateProduct);
productRouter.delete('/:productCode',deleteProductById);



export default productRouter;