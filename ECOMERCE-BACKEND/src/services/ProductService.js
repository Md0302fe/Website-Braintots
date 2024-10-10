const Product = require("../models/ProductModel");
const Category = require("../models/ProductCategory");
const bcrypt = require("bcrypt");

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const {} = require("../services/JwtService");

// Hàm Tạo 1 Product Mới
const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const {
      name,
      masanpham,
      image,
      type,
      price,
      countInStock,
      rating,
      description,
    } = newProduct;

    try {
      const existedProduct = await Product.findOne({
        masanpham: masanpham,
      });

      // Nếu Existed Product tồn tại
      if (existedProduct != null) {
        console.log("existedProduct ", existedProduct.masanpham);
        return resolve({
          status: "ERROR",
          message: `Sản phẩm ${existedProduct.masanpham} đã tồn tại !`,
        });
      }

      // Create Schema Product
      const createdProduct = await Product.create({
        name,
        masanpham,
        image,
        type,
        price,
        countInStock,
        rating,
        description,
      });

      if (createdProduct) {
        return resolve({
          status: "OK",
          message: "Tạo sản phẩm thành công",
          data: createdProduct,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

// Hàm Tạo 1 Product Mới
const createCategory = (newCategory) => {
  return new Promise(async (resolve, reject) => {
    const { name } = newCategory;
    try {
      const existedCategory = await Category.findOne({
        name: name,
      });

      // Nếu Existed Product tồn tại
      if (existedCategory != null) {
        console.log("existedCategory ", existedCategory.name);
        return resolve({
          status: "ERROR",
          message: `Loại Hàng ${existedCategory.name} đã tồn tại !`,
        });
      }

      // Create Schema Product
      const createdCategory = await Category.create({
        name,
      });

      if (createdCategory) {
        return resolve({
          status: "OK",
          message: "Tạo loại hàng thành công",
          data: createdCategory,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

// Hàm Update User
const updateProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Tìm id trong hệ thống thông qua (_id) / tìm id -> đợi -> dùng await
      const product = await Product.findOne({ _id: id });
      // Nếu user không tồn tại trong hệ thống
      if (product === null) {
        return resolve({
          status: "ERROR",
          message: `Không tìm thấy id sản phẩm !`,
        });
      }

      // gọi và update user by id + data cần update , nếu muốn trả về object mới cập nhật thì cần thêm {new:true}
      const updateProduct = await Product.findByIdAndUpdate(id, data, {
        new: true,
      });

      return resolve({
        status: "OK",
        message: "Cập nhật sản phẩm thành công",
        updateProduct,
      });
    } catch (error) {
      reject(error);
    }
  });
};

// // Hàm Get Detail Product
const getDetailProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findOne({
        _id: id,
      }).populate("type"); // Sử dụng populate để lấy thông tin category

      if (product === null) {
        return resolve({
          status: "ERROR",
          message: "Sản phẩm không tồn tại!",
        });
      }

      // product.type sẽ chứa thông tin của category nếu bạn dùng populate
      return resolve({
        status: "OK",
        message: `Truy cập chi tiết sản phẩm ${product._id} thành công`,
        data: product,
      });
    } catch (error) {
      reject(error);
    }
  });
};

// Hàm Delete Product
const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Tìm product(object) trong hệ thống thông qua (_id) / tìm id -> đợi -> dùng await
      const product = await Product.findOne({ _id: id });
      // Nếu product không tồn tại trong hệ thống
      if (product === null) {
        return resolve({
          status: "OK",
          message: `Sản phẩm không tồn tại!`,
        });
      }
      // gọi và delete product by id
      const deleteProduct = await Product.findByIdAndDelete(id);
      return resolve({
        status: "OK",
        message: "Xóa sản phẩm thành công",
      });
    } catch (error) {
      reject(error);
    }
  });
};

// Hàm Delete Product
const deleteManyProduct = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Delete Many Product
      await Product.deleteMany({ _id: ids });
      return resolve({
        status: "OK",
        message: "Xóa danh sách sản phẩm thành công",
      });
    } catch (error) {
      reject(error);
    }
  });
};

// Hàm Get All PRODUCT -- Sort Sản Phẩm -- Filter Sản Phẩm
const getAllProduct = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      //countDocuments() : get ra tổng product hiện có trong collections Product
      const totalProduct = await Product.countDocuments();
      // tổng số trang.
      const totalPage = Math.ceil(totalProduct / limit);

      // Nếu có request filter product -> danh sách product đã được filter
      if (filter && filter?.length > 0) {
        const label = filter[0].trim(); // label === type
        const value = filter[1].trim(); // value : String (id của category)
        if (label === "type") {
          if (!mongoose.Types.ObjectId.isValid(value)) {
            return reject("Invalid ObjectId");
          }
          try {
            const objectIdValue = new ObjectId(value);
            const allObjectFilter = await Product.find({
              [label]: objectIdValue,
            })
              .limit(limit)
              .skip(page * limit);
            return resolve({
              status: "OK",
              message: "Get All Product Filter Success",
              totalItems: totalProduct,
              currentPage: page + 1,
              totalPage: totalPage,
              data: allObjectFilter,
            });
          } catch (error) {
            reject(error);
          }
        } else {
          const allObjectFilter = await Product.find({
            [label]: { $regex: value },
          })
            .limit(limit)
            .skip(page * limit);
          return resolve({
            status: "OK",
            message: "Get All Product Filter Success",
            totalItems: totalProduct,
            currentPage: page + 1,
            totalPage: totalPage,
            data: allObjectFilter,
          });
        }
      }

      // Nếu có request sort product -> danh sách product đã được sort
      if (sort) {
        const objectSort = {};
        // objectSort[key] = value; biến objectSort sinh ra để tạo thành kết quả này
        objectSort[sort[1]] = sort[0];
        const allProductSort = await Product.find()
          .limit(limit) // .limit() : quản lý số lượng items được get ra từ db.
          .skip(page * limit) // .skip() : là số phần từ cần next qua (công thức dựa trên item/page và số trang hiện tại)
          .sort(objectSort);
        return resolve({
          status: "OK",
          message: "Get All Sort Product Success",
          totalItems: totalProduct,
          currentPage: page + 1,
          totalPage: totalPage,
          data: allProductSort,
        });
      }

      const allProduct = await Product.find()
        .limit(limit)
        .skip(page * limit)
        .populate("type");

      return resolve({
        status: "OK",
        message: "Get All Product Success",
        totalItems: totalProduct,
        currentPage: page + 1,
        totalPage: totalPage,
        data: allProduct,
      });
    } catch (error) {
      reject(error);
    }
  });
};

// Hàm Get All PRODUCT -- Sort Sản Phẩm -- Filter Sản Phẩm
const getAllCategory = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allProduct = await Category.find();
      return resolve({
        status: "OK",
        message: "Get All Category Success",
        data: allProduct,
      });
    } catch (error) {
      reject(error);
    }
  });
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

// File services này là file dịch vụ /
// UserService này cung cấp các dịch vụ liên quan tới user.
