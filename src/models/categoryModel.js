import pool from "../config/connection.js";

const getCategories = async () => {
    const [rowsCategories] = await pool.query('SELECT * FROM CATEGORIES');
    return rowsCategories;
}
const getCategoryById = async (categoryId) => {
    const [rowsCategories] = await pool.query('SELECT * FROM CATEGORIES WHERE Category_id = ?', [categoryId]);
    return rowsCategories;
}
const postCategory = async (categoryData) => {
    const {name} = categoryData; // detructuring 
    const [result] = await pool.query('INSERT INTO CATEGORIES (Name) VALUES (?)', [name]);
    return result;
}
const putCategory = async (categoryId,categoryData) => {
    const {name} = categoryData; 
    const [result] = await pool.query('UPDATE CATEGORIES SET Name = ? WHERE Category_id = ?', [name, categoryId]);
    return result;
}
const deleteCategory = async (categoryId) => {
    const [result] = await pool.query('DELETE FROM CATEGORIES WHERE Category_id = ?', [categoryId]);
    return result;
}
export {getCategories, getCategoryById, postCategory,putCategory, deleteCategory};

