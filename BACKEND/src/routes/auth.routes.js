const express=require("express");
const userModel=require("../models/usersModel")
const authController=require("../controller/auth.controller")


const router=express.Router();

//@API:-POST
//registration of user
router.post("/register",authController.registerUser);

//@API:-POST
//login of user
router.post("/login",authController.loginUser);

module.exports=router;