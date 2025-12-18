import pool from "../config/connection.js";

// GET all toppings
const getToppings = async () => {
  const query = `
    SELECT Topping_id, Name AS topping_name, Price
    FROM TOPPINGS
    ORDER BY Topping_id;
  `;
  const [rows] = await pool.query(query);
  return rows;
};

// GET topping by id
const getToppingsById = async (toppingId) => {
  const query = `
    SELECT Topping_id, Name AS topping_name, Price
    FROM TOPPINGS
    WHERE Topping_id = ?;
  `;
  const [rows] = await pool.query(query, [toppingId]);
  return rows; // rows[0] nếu bạn muốn trả 1 object
};

// CREATE topping (Topping_id auto by trigger)
const postTopping = async (toppingData) => {
  const { name, price } = toppingData;

  if (!name) throw new Error("Thiếu name");
  if (price == null || Number(price) <= 0) throw new Error("price phải > 0");

  const [result] = await pool.query(
    `INSERT INTO TOPPINGS (Name, Price) VALUES (?, ?)`,
    [name, price]
  );
  return result;
};

// UPDATE topping
const putTopping = async (toppingId, toppingData) => {
  const { name, price } = toppingData;

  if (!toppingId) throw new Error("Thiếu toppingId");
  if (!name) throw new Error("Thiếu name");
  if (price == null || Number(price) <= 0) throw new Error("price phải > 0");

  const [result] = await pool.query(
    `UPDATE TOPPINGS SET Name = ?, Price = ? WHERE Topping_id = ?`,
    [name, price, toppingId]
  );
  return result;
};

// DELETE topping
const deleteTopping = async (toppingId) => {
  if (!toppingId) throw new Error("Thiếu toppingId");

  const [result] = await pool.query(
    `DELETE FROM TOPPINGS WHERE Topping_id = ?`,
    [toppingId]
  );
  return result;
};

export { getToppings, getToppingsById, postTopping, putTopping, deleteTopping };
