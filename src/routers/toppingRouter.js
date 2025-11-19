import {getAllToppings, findToppingById, createTopping, updateTopping, deleteToppingById} from '../controllers/toppingController.js';
import express from 'express' //sử dụng cú pháp import thay vì require do đã khai báo "type": "module" trong package.json

const toppingRouter = express.Router() // Tạo một Router cho topping
toppingRouter.get('/',getAllToppings);
toppingRouter.get('/:toppingCode',findToppingById);
toppingRouter.post('/', createTopping); // tạo mới topping
toppingRouter.put('/:toppingCode',updateTopping);
toppingRouter.delete('/:toppingCode',deleteToppingById);

export default toppingRouter;