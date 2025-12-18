import pool from "../config/connection.js";

// get sản phẩm product
const getProductsAndSize = async () => {
  // query lấy tất cả các sản phẩm mỗi gize 1 hàng
  const query = `SELECT
        p.Product_code,
        p.Name AS product_name,
        c.Name AS category_name,
        ps.Size_product_id,
        s.Size_id,
        s.Name AS size_name,
        s.Volume,
        ps.Price
        FROM PRODUCTS p
        JOIN CATEGORIES c ON c.Category_id = p.Category_id
        JOIN PRODUCTS_SIZES ps ON ps.Product_code = p.Product_code
        JOIN SIZES s ON s.Size_id = ps.Size_id
        ORDER BY p.Product_code, s.Name;
    `;
  const [rowsProducts] = await pool.query(query); // truy  vấn tất cả sản phẩm trong product
  return rowsProducts;
};
// tim kiếm sản phẩm theo id
const getProduct = async (productCode) => {
  // tìm kiếm sản phẩm theo id hiển thị tất cả size và giá
  const query = `SELECT
        p.Product_code,
        p.Name AS product_name,
        c.Name AS category_name,
        ps.Size_product_id,
        s.Name AS size_name,
        s.Volume,
        ps.Price
        FROM PRODUCTS p
        JOIN CATEGORIES c ON c.Category_id = p.Category_id
        JOIN PRODUCTS_SIZES ps ON ps.Product_code = p.Product_code
        JOIN SIZES s ON s.Size_id = ps.Size_id
        WHERE p.Product_code = ?
        ORDER BY s.Name;
    `;
  const [rowsProducts] = await pool.query(query, [productCode]); // truy  vấn sản phẩm dựa theo id
  return rowsProducts;
};
// xoa sản phẩm theo id
const deleteProduct = async (productCode) => {
  const [result] = await pool.query(
    `DELETE FROM PRODUCTS WHERE Product_code = ?`,
    [productCode]
  ); // truy  vấn tất cả sản phẩm trong product
  return result;
};
// tạo mới sản phẩm
const postProduct = async (productData) => {
  const { name, categoryId, sizes } = productData;
  if (!name || !categoryId) throw new Error("Thiếu name hoặc categoryId");
  if (!Array.isArray(sizes) || sizes.length < 1 || sizes.length > 2) {
    throw new Error("sizes phải là mảng 1 hoặc 2 phần tử");
  }
  // validate basic
  for (const s of sizes) {
    if (!s.sizeId || s.price == null) throw new Error("Thiếu sizeId hoặc price");
    if (Number(s.price) <= 0) throw new Error("price phải > 0");
  }
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    // 1) Insert product (trigger tự sinh Product_code)
    await conn.query(
      `INSERT INTO PRODUCTS (Name, Category_id) VALUES (?, ?)`,
      [name, categoryId]
    );
    // 2) Lấy Product_code vừa tạo (cách nhanh)
    const [rows] = await conn.query(
      `SELECT Product_code FROM PRODUCTS ORDER BY Product_code DESC LIMIT 1`
    );
    const productCode = rows?.[0]?.Product_code;
    if (!productCode) throw new Error("Không lấy được Product_code vừa tạo");

    // 3) Insert sizes
    const values = sizes.map((s) => [productCode, s.sizeId, s.price]);
    await conn.query(
      `INSERT INTO PRODUCTS_SIZES (Product_code, Size_id, Price) VALUES ?`,
      [values]
    );
    await conn.commit();
    return { productCode };
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    conn.release();
  }
};
// cập nhật sản phẩm
const putProduct = async (productCode, productData) => {
  const { name, categoryId, sizes } = productData;
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    // 1) Update thông tin product
    const [resultProduct] = await conn.query(
      `UPDATE PRODUCTS SET Name = ?, Category_id = ? WHERE Product_code = ?`,
      [name, categoryId, productCode]
    );
    // 2) Update giá theo size (nếu gửi sizes lên)
    if (Array.isArray(sizes) && sizes.length > 0) {
      for (const s of sizes) {
        if (!s.sizeId || s.price == null) {
          throw new Error("Thiếu sizeId hoặc price");
        }
        const [r] = await conn.query(
          `UPDATE PRODUCTS_SIZES
           SET Price = ?
           WHERE Product_code = ? AND Size_id = ?`,
          [s.price, productCode, s.sizeId]
        );
      }
    }
    await conn.commit();
    return { resultProduct };
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    conn.release();
  }
};
const deleteSizeProduct = async(productCode, sizeId)=>{ // xoá size của sản phẩm
    if (!productCode || !sizeId) throw new Error("Thiếu productCode hoặc sizeId");

  const [result] = await pool.query(
    `DELETE FROM PRODUCTS_SIZES
     WHERE Product_code = ? AND Size_id = ?`,
    [productCode, sizeId]
  );

  return result;
}
const getProducts = async()=>{
    const query = `
    SELECT
      Product_code,
      Name AS product_name
    FROM PRODUCTS
    ORDER BY Product_code;
  `;

  const [rows] = await pool.query(query);
  return rows;
}

export { getProducts, getProduct, deleteProduct, postProduct, putProduct, getProductsAndSize, deleteSizeProduct };
