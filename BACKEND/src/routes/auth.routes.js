const express=require("express");
const userModel=require("../models/usersModel")
const authController=require("../controller/auth.controller");
const authMiddleware=require("../middleware/auth.middleware");


const router=express.Router();

//@API:-POST
//registration of user
router.post("/register",authController.registerUser);

//@API:-POST
//login of user
router.post("/login",authController.loginUser);

//getMe-->jo bhi user isme request karega ussi ka data idhar return karna hai 
router.get("/get-Me",authMiddleware.authUser,authController.getMe);

//logout
router.get("/logout",authMiddleware.authUser,authController.logoutUser);
module.exports=router;