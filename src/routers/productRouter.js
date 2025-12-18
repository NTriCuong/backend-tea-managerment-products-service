import express from 'express' //sử dụng cú pháp import thay vì require do đã khai báo "type": "module" trong package.json
import {getAllProducts, findProductById, createProduct, updateProduct, deleteProductById, getAllProductAndSize, deleteSize} from '../controllers/productController.js';
import {verifyAccessToken, requireAdmin} from '../controllers/verifyAccessToken.js';

const productRouter = express.Router() // Tạo một Router cho sản phẩm
// cấu hình router
productRouter.get('/',getAllProducts); // Định nghĩa route lấy danh sách sản phẩm
productRouter.get('/get-product-attach-size/', getAllProductAndSize);
productRouter.get('/:productCode',findProductById); // tim
productRouter.post('/', verifyAccessToken, requireAdmin, createProduct); // tạo mới sản phẩm
productRouter.put('/:productCode', verifyAccessToken, requireAdmin, updateProduct);
productRouter.delete('/:productCode/sizes/:sizeId', verifyAccessToken, requireAdmin, deleteSize);
productRouter.delete('/:productCode', verifyAccessToken, requireAdmin, deleteProductById);

export default productRouter;