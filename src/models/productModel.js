import pool from '../config/connection.js';

// get sản phẩm product
const getProducts = async () =>{
    const query = `SELECT 
        p.Product_code,
        p.Name   AS product_name,
        c.Name   AS category_name,
        p.Price
    FROM PRODUCTS p
    JOIN CATEGORIES c
        ON p.Category_id = c.Category_id`;
    const [rowsProducts] = await pool.query(query);// truy  vấn tất cả sản phẩm trong product
    return rowsProducts;
}
// tim kiếm sản phẩm theo id
const getProduct = async (productCode) =>{ 
    const query = `SELECT 
        p.Product_code,
        p.Name   AS product_name,
        c.Name   AS category_name,
        p.Price
    FROM PRODUCTS p
    JOIN CATEGORIES c
        ON p.Category_id = c.Category_id
    WHERE p.Product_code = ?`;
    const [rowsProducts] = await pool.query(query, [productCode]);// truy  vấn sản phẩm dựa theo id
    return rowsProducts;
}
// xoa sản phẩm theo id
const deleteProduct = async (productCode) =>{
    const [result] = await pool.query(`DELETE FROM PRODUCTS WHERE Product_code = ?`,[productCode]);// truy  vấn tất cả sản phẩm trong product
    return result;
}
// tạo mới sản phẩm
const postProduct = async (productData) =>{
    const {name, categoryId, price} = productData;
    const [result] = await pool.query(`INSERT INTO PRODUCTS (Name, Category_id ,Price) VALUES (?, ?, ?)`, 
    [name, categoryId, price]);// truyền dữ liệu vào câu truy vấn cú pháp placeholder
    return result;
}
// cập nhật sản phẩm
const putProduct = async (productCode, productData) =>{
    const {name, categoryId, price} = productData;
    const [result] = await pool.query(`UPDATE PRODUCTS SET name = ?,Category_id=? , Price = ? WHERE Product_code = ?`, 
    [name, categoryId, price, productCode]);
    return result;
}

export {getProducts, getProduct, deleteProduct, postProduct, putProduct};