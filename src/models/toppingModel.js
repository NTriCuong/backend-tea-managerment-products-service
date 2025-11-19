import pool from '../config/connection.js';

// topping
const getToppings = async () =>{
    const [rowsToppings] = await pool.query('SELECT * FROM TOPPINGS');// truy  vấn tất cả sản phẩm trong product
    return rowsToppings;
}
const getToppingsById = async () =>{
    const toppingId = req.params.toppingId;
    const [rowsToppings] = await pool.query(`SELECT * FROM TOPPINGS WHERE Topping_id = ?`,[toppingId]);// truy  vấn tất cả sản phẩm trong product
    return rowsToppings;
}
const postTopping = async (toppingData) =>{
    const {name, price} = toppingData;
    const [result] = await pool.query(`INSERT INTO TOPPINGS (Name, Price) VALUES (?, ?)`, 
    [name, price]);// truyền dữ liệu vào câu truy vấn cú pháp placeholder
    return result;
}
const putTopping = async (toppingData) =>{
    const toppingId = req.params.toppingId;
    const {name, price} = toppingData;
    const [result] = await pool.query(`UPDATE TOPPINGS SET name = ?, Price = ? WHERE Topping_id = ?`, 
    [name, price, toppingId]);
    return result;
}
const deleteTopping = async () =>{
    const toppingId = req.params.toppingId;
    const [result] = await pool.query(`DELETE FROM TOPPINGS WHERE Topping_id = ?`,
    [toppingId]);
    return result;
}
export {getToppings, getToppingsById, postTopping, putTopping, deleteTopping};