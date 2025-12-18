import { getProducts, getProduct, deleteProduct, postProduct, putProduct, getProductsAndSize, deleteSizeProduct } from '../models/productModel.js';
//product
const getAllProducts = async (req, res) => {
    try {
        const products = await getProducts();  // gọi model
        return res.status(200).json(products);         // gửi response 
  } catch (error) {
        console.error('get all error:', error);
        return res.status(500).json({
        message: 'Lỗi server',
        error: error.message,
        });
  }
}
const getAllProductAndSize = async(req, res)=>{
    try {
        const rows = await getProductsAndSize();
        return res.status(200).json(rows);
    } catch (error) {
        console.error("get products and size error:", error);
        return res.status(500).json({ message: "Lỗi server", error: error.message });
  }
}
const deleteSize = async(req, res) =>{
    try {
    const { productCode, sizeId } = req.params;
    const result = await deleteSizeProduct(productCode, Number(sizeId));

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Không tìm thấy size của sản phẩm" });
    }
    return res.status(200).json({ message: "Xóa size thành công" });
  } catch (error) {
    console.error("delete size error:", error);
    return res.status(500).json({ message: "Lỗi server", error: error.message });
  }
}
const findProductById = async (req, res) => {
    try {
        const productCode = req.params.productCode;
        const product = await getProduct(productCode);
        if (product.length === 0) { // nếu không tìm thấy trong db
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }
        return res.status(200).json(product);

    } catch (error) {
        console.error('get product by id error:', error); // nếu không truy cập được db
        return res.status(500).json({
        message: 'Lỗi server',
        error: error.message,
        });
    }
}
const createProduct = async (req, res) => {
    try {
    const data = req.body;
    const result = await postProduct(data);
    return res.status(201).json({ message: "Thêm thành công", ...result });
  } catch (error) {
    // lỗi validate (client)
    return res.status(400).json({ message: error.message });
  }
}
const updateProduct = async (req, res) => {
     try {
    const productCode = req.params.productCode;
    const data = req.body;
    await putProduct(productCode, data);
    return res.status(200).json({ message: "Cập nhật thành công" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
const deleteProductById = async (req, res) => {
    try {
        const productCode = req.params.productCode;
        const result = await deleteProduct(productCode);
        if (result.affectedRows === 0) { // nếu không tìm thấy trong db
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }
        return res.status(200).json({ message: 'Xóa thành công' });
    } catch (error) {
        console.error('delete product by id error:', error); // nếu không truy cập được db
        return res.status(500).json({
        message: 'Lỗi server',
        error: error.message,
        });
    }
}

export {getAllProducts, findProductById, createProduct, updateProduct, deleteProductById, getAllProductAndSize, deleteSize};