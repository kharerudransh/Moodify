const userModel=require("../models/usersModel");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");



//API
//registerUser
//api/auth/register
async function registerUser(req,res){   
    const {username,email,password}=req.body;
    const alreadyUser=await userModel.findOne({$or:[{email},{username}]}); 
    if(alreadyUser){
        return res.status(400).json({

            message:"User already exists with same and email or username"
        })
    }
    const hashPassword=await bcrypt.hash(password,10);
    
    const user=await userModel.create({
        username,
        email,
        password:hashPassword
    })
    
    const token=jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT_SECRET,
    {
        expiresIn:"1d"
    })
    //set karna token ko cookie me
    //httpOnly:true-->"Ye cookie sirf server padh sakta hai, JavaScript (browser side) nahi" — security ke liye lagaya jata hai taaki token safe rahe.
    res.cookie("token",token,{httpOnly:true});
    return res.status(201).json({
        message:"User registered successfully",
        user
    })

}

//LoginUser
//api/auth/login
async function loginUser(req,res){
    const{username,email,password}=req.body;
    const user=await userModel.findOne({$or:[
        {username},
        {email}
    ]}).select("+password")
    if(!user){
        return res.status(400).json({
            message:"Invalid Credentials"
        })
    }
    const isPasswordValid=await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid Credentials"
        })
    }
    const token=jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT_SECRET,{
        expiresIn:"1d"
    })
    res.cookie("token",token,{httpOnly:true});
    return res.status(201).json({
        message:"Login Successfull",
        user 
    })

}
module.exports={registerUser,loginUser}