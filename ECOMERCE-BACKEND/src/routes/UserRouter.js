// import express
const express = require("express");
// import express router
const router = express.Router();

const UserController = require("../controllers/UserController");
const {
  authMidleware,
  authUserMidleware,
} = require("../middleware/AuthMidleware");

// # CREATE - USER / POST
router.post("/sign-up", UserController.createUser);
// # LOGIN - USER / POST
router.post("/sign-in", UserController.userLogin);
// # LOGOUT - USER / POST
router.post("/log-out", UserController.userLogout);
// # UPDATE - USER / PUT
router.put("/update-user/:id", authUserMidleware, UserController.updateUser);
// # DELETE - USER / DELETE
router.delete("/delete-user/:id", authMidleware, UserController.deleteUser);
// # GET ALL USER - USER / GET
router.get("/getAll", authMidleware, UserController.getAllUser);
// # GET DETAIL USER - USER / GET
router.get("/detail-user/:id", authUserMidleware, UserController.getDetailUser);
// # POST REFRESH--TOKEN - POST
router.post("/refresh-token", UserController.refreshToken);
// # DELETE DELETE--MANY-TOKEN - DELETE
router.delete("/delete-many", authMidleware, UserController.deleteManyUser);

module.exports = router;
// File này là UserRouter / Router dành riêng cho User

/*-------------------------------------------------------*/
// router ==> controller ==> services
// sau đó services gữi 1 json(object) ==> controller ==> return res.status(200).json(respone); controller phản hồi.
