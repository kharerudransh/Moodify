const express=require("express");
const cookieParser=require("cookie-parser")
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const app=express();




//Using middleware
app.use(express.json());
app.use(cookieParser());

//Router
const authRouter=require("./routes/auth.routes");

//require Routes
app.use("/api/auth",authRouter);

//export 
module.exports=app;
