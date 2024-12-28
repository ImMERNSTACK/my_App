const express = require("express");
const router=express.Router();
const userController=require("../controller/user.controller");
const productController=require("../controller/product.controller");
const cartContoller=require("../controller/cart.controller");
const rolesController=require("../controller/roles.controller");
const { auth } = require("../middleware/auth");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) { 
      cb(null, 'uploads/'); // Directory to save uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Generate unique filename
    },
  });
  
const upload = multer({ storage: storage });

router.post("/user/register",userController.userRegister);
router.post("/user/sendOtp",userController.userOtpSend);
router.post("/user/login",userController.userLogin);
router.post("/products/save_all",auth,productController.productSaveInbulk);
router.post("/products/get_all",auth,productController.getallProducts);
router.post("/products/product",auth,productController.getProductById);
router.post("/products/create",auth,upload.single('thumbnail'),productController.createProduct);
router.post("/add-to-cart",auth,cartContoller.addToCart);
router.post("/get-cart",auth,cartContoller.getCart);
router.post("/remove-from-cart",auth,cartContoller.removeFromCart);
router.post("/add-role",rolesController.addRole);
router.post("/delete-role",rolesController.deleteRole);
module.exports = router;
