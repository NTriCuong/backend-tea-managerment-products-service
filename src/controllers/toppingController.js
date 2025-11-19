
import {getToppings, getToppingsById, postTopping, putTopping, deleteTopping} from '../models/toppingModel.js';

//toppings
const getAllToppings = async (req, res) => {
    try {
        const toppings = await getToppings();  // gọi model
        return res.status(200).json(toppings);         // gửi response 
    } catch (error) {
        console.error('get all toppings by id error:', error); // nếu không truy cập được db
        return res.status(500).json({
        message: 'Lỗi server',
        error: error.message,
        });
    }
}
const findToppingById = async (req, res) => {
    try {
        const toppingId = req.params.toppingId;
        const data = await getToppingsById(toppingId);
        if (data.length === 0) { // nếu không tìm thấy trong db
            return res.status(404).json({ message: 'Không tìm thấy topping' });
        }
        return res.status(200).json(data);

    } catch (error) {
        console.error('get topping by id error:', error); // nếu không truy cập được db
        return res.status(500).json({
        message: 'Lỗi server',
        error: error.message,
        });
    }
}
const createTopping = async (req, res) => {
    try{
        const data = req.body;
        await postTopping(data);
        return res.status(201).json({message: 'Thêm topping thành công'});
    } catch (error) {
        console.error('create topping error:', error); // nếu không truy cập được db
        return res.status(500).json({
        message: 'Lỗi server',
        error: error.message,
        });
    }
}
const updateTopping = async (req, res) => {
    try{
        const toppingId = req.params.toppingId; // lấy toppingId từ params
        const data = req.body;
        await putTopping(toppingId, data);
        return res.status(200).json({message: 'Cập nhật thành công'});
    } catch (error) {
        console.error('update topping error:', error); // nếu không truy cập được db
        return res.status(500).json({
        message: 'Lỗi server',
        error: error.message,
        });
    }
} 
const deleteToppingById = async (req, res) => {
    try {
        const toppingId = req.params.toppingId;
        const result = await deleteTopping(toppingId);
        if (result.affectedRows === 0) { // nếu không tìm thấy trong db
            return res.status(404).json({ message: 'Không tìm thấy topping' });
        }
        return res.status(200).json({ message: 'Xóa thành công' });
    } catch (error) {
        console.error('delete topping by id error:', error); // nếu không truy cập được db
        return res.status(500).json({
        message: 'Lỗi server',
        error: error.message,
        });
    }
}
export {getAllToppings, findToppingById, createTopping, updateTopping, deleteToppingById};