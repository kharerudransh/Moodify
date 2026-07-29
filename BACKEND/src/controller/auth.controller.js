const userModel = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const redis = require("../config/cache");
const blackListModel = require("../models/blacklist.model")



//API
//registerUser
//api/auth/register
async function registerUser(req, res) {
    const { name, username, email, password } = req.body;
    const alreadyUser = await userModel.findOne({ $or: [{ email }, { username }] });
    if (alreadyUser) {
        return res.status(400).json({

            message: "User already exists with same and email or username"
        })
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        name,
        username,
        email,
        password: hashPassword
    })

    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        })
    //set karna token ko cookie me
    //httpOnly:true-->"Ye cookie sirf server padh sakta hai, JavaScript (browser side) nahi" — security ke liye lagaya jata hai taaki token safe rahe.
    res.cookie("token", token, { httpOnly: true });
    return res.status(201).json({
        message: "User registered successfully",
        user
    })

}

//LoginUser
//api/auth/login
async function loginUser(req, res) {
    const { username, email, password } = req.body;
    const user = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    }).select("+password")
    if (!user) {
        return res.status(400).json({
            message: "Invalid Credentials"
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid Credentials"
        })
    }
    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })
    res.cookie("token", token, { httpOnly: true });
    return res.status(201).json({
        message: "Login Successfull",
        user
    })

}

//getMe
async function getMe(req, res) {
    const user = await userModel.findById(req.user.id).select("-password");
    if (!user) {
        return res.status(400).json({
            message: "who are you ??"
        })
    }
    return res.status(200).json({
        message: "User fetched successfully",
        user
    })
}

//logout
async function logoutUser(req, res) {
    const token = req.cookies.token;
    res.clearCookie("token");
    if (!token) {
        return res.status(400).json({
            message: "No token found"
        })
    }
    await redis.set(token, Date.now().toString());
    return res.status(200).json({
        message: "User logged out successfully"
    })
}
module.exports = { registerUser, loginUser, getMe, logoutUser }