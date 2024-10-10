// import express
const express = require("express");
// import express router
const router = express.Router();
const ProductController = require("../controllers/ProductController");
// middleware
const {
  authDetailUserMidleware,
  authMidleware,
} = require("../middleware/AuthMidleware");

// # CREATE - PRODUCT / POST
router.post("/create", ProductController.createProduct);

// # CREATE - CATEGORY FOR PRODUCT / POST
router.post("/create-category", ProductController.createCategory);

// # UPDATE - PRODUCT / POST
router.put("/update/:id", authMidleware, ProductController.updateProduct);

// # GET - PRODUCT - DETAIL / GET
router.get("/details/:id", ProductController.getDetailProduct);

// # DELETE - DELETE-PRODUCT / DELETE
router.delete(
  "/delete-product/:id",
  authMidleware,
  ProductController.deleteProduct
);
// # DELETE DELETE--MANY-TOKEN - DELETE
router.delete(
  "/delete-many",
  authMidleware,
  ProductController.deleteManyProduct
);

// # GET-ALL - PRODUCTS / GET
router.get("/get-all", ProductController.getAllProduct);

// # GET-ALL - CATEGORY / GET
router.get("/get-all-category", ProductController.getAllCategory);

module.exports = router;

// File này là Product / Router dành riêng cho User
/*-------------------------------------------------------*/
// router ==> controller ==> services
// sau đó services gữi 1 json(object) ==> controller ==> return res.status(200).json(respone); controller phản hồi.
