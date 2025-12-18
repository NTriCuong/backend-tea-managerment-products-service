import {getAllToppings, findToppingById, createTopping, updateTopping, deleteToppingById} from '../controllers/toppingController.js';
import express from 'express' //sử dụng cú pháp import thay vì require do đã khai báo "type": "module" trong package.json
import {verifyAccessToken, requireAdmin} from '../controllers/verifyAccessToken.js';

const toppingRouter = express.Router() // Tạo một Router cho topping
toppingRouter.get('/',getAllToppings);
toppingRouter.get('/:toppingId',findToppingById);
toppingRouter.post('/', verifyAccessToken, requireAdmin, createTopping); // tạo mới topping
toppingRouter.put('/:toppingId', verifyAccessToken, requireAdmin, updateTopping);
toppingRouter.delete('/:toppingId', verifyAccessToken, requireAdmin, deleteToppingById);

export default toppingRouter;