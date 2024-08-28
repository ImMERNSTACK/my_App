const express = require("express");
const router=express.Router();
const controller=require("../controller/user.controller")

router.post("/user/register",controller.userRegister);
router.post("/user/sendOtp",controller.userOtpSend);
router.post("/user/login",controller.userLogin);
module.exports = router;
