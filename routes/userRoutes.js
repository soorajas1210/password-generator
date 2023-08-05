const express = require("express");
const userProtect = require("../middlewares/userAuthMiddleware");
const { userSignup, userSignin, userData, addData } = require("../controller/userController");
const router = express.Router();

router.post("/signup", userSignup);
router.post("/signin", userSignin);
router.get("/data",userProtect, userData);
router.post("/addData",userProtect, addData);


module.exports = router;
