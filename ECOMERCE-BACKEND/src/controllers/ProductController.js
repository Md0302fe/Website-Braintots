const JwtService = require("../services/JwtService");
const ProductService = require("../services/ProductService");

// Phương Thức Khởi Tạo 1 New Product
const createProduct = async (req, res) => {
  try {
    const {
      name,
      masanpham,
      image,
      type,
      price,
      countInStock,
      rating,
      description,
    } = req.body;

    if (
      !name ||
      !masanpham ||
      !image ||
      !type ||
      !price ||
      !countInStock ||
      !rating
    ) {
      return res.status(200).json({
        status: "ERROR",
        message: "Thông tin sản phẩm không hợp lệ",
      });
    }
    const respone = await ProductService.createProduct(req.body);
    // Log ra API check ,
    return res.status(200).json(respone);
  } catch (error) {
    return res.status(404).json({
      eMsg: error,
    });
  }
};

// Phương Thức Khởi Tạo 1 New Category
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(200).json({
        status: "ERROR",
        message: "Tên loại hàng không hợp lệ",
      });
    }

    const respone = await ProductService.createCategory(req.body);
    // Log ra API check ,
    return res.status(200).json(respone);
  } catch (error) {
    return res.status(404).json({
      eMsg: error,
    });
  }
};

// Phương Thức Update Thông Tin Của Product
const updateProduct = async (req, res) => {
  try {
    // Lấy được id product thông qua URL (/product-user/:id) / get = params
    const productId = req.params.id;
    const data = req.body;
    if (!productId) {
      res.status(200).json({
        status: "ERROR",
        message: "The Product Id is required !",
      });
    }
    const respone = await ProductService.updateProduct(productId, data);
    // Log API Check
    return res.status(200).json(respone);
  } catch (error) {
    return res.status(404).json({
      eMsg: error,
    });
  }
};

// Phương Thức Get Detail User
const getDetailProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const respone = await ProductService.getDetailProduct(productId);
    // Log API Check
    return res.status(200).json(respone);
  } catch (error) {
    return res.status(404).json({
      eMsg: error,
    });
  }
};

// Phương Thức Delele User
const deleteProduct = async (req, res) => {
  try {
    // Lấy được id người dùng thông qua URL (/update-user/:id) / get = params
    const productId = req.params.id;
    if (!productId) {
      res.status(200).json({
        status: "ERROR",
        message: "The Product id is required !",
      });
    }

    const respone = await ProductService.deleteProduct(productId);
    return res.status(200).json(respone);
  } catch (error) {
    return res.status(404).json({
      eMsg: error,
    });
  }
};

// Phương Thức DELETE Many
const deleteManyProduct = async (req, res) => {
  try {
    // Lấy được id người dùng thông qua URL (/update-user/:id) / get = params
    const ids = req.body;
    if (!ids) {
      res.status(200).json({
        status: "ERROR",
        message: "The Product ids is required !",
      });
    }

    const respone = await ProductService.deleteManyProduct(ids);

    return res.status(200).json(respone);
  } catch (error) {
    return res.status(404).json({
      eMsg: error,
    });
  }
};

// Phương Thức Get All PRODUCT
const getAllProduct = async (req, res) => {
  try {
    // Lưu ý , với mỗi key query được sử dụng 2 lần thì nó sẽ có dạng array []
    const { limit, page, sort, filter } = req.query;

    const respone = await ProductService.getAllProduct(
      +limit || 6,
      +page || 0,
      sort,
      filter
    );

    // Log API Check
    return res.status(200).json(respone);
  } catch (error) {
    return res.status(404).json({
      eMsg: error,
    });
  }
};

// Phương Thức Get All PRODUCT
const getAllCategory = async (req, res) => {
  try {
    // Lưu ý , với mỗi key query được sử dụng 2 lần thì nó sẽ có dạng array []
    const respone = await ProductService.getAllCategory();
    // Log API Check
    return res.status(200).json(respone);
  } catch (error) {
    return res.status(404).json({
      eMsg: error,
    });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getDetailProduct,
  deleteProduct,
  getAllProduct,
  deleteManyProduct,
  createCategory,
  getAllCategory,
};

// File này nằm trong Controller / Folder điều khiển
// Controller chứa logic xử lý từng yêu cầu cụ thể, kiểm tra dữ liệu yêu cầu, và đưa ra phản hồi cho client.
// Controller nhận dữ liệu từ route, gọi service để thực hiện các thao tác cần thiết, và sau đó trả về kết quả.
// Giúp tách biệt giữa luồng điều khiển và xử lý logic phức tạp.

// req.body (sau khi có body-parse giúp trã giữ liệu về dạng json) => dữ liệu có sẳn ở dạng object
