const express=require("express");
const cookieParser=require("cookie-parser")
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const app=express();
const cors=require("cors")



//Using middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}));

//Router
const authRouter=require("./routes/auth.routes");
const songRouter=require("./routes/song.Routes")

//require Routes
app.use("/api/auth",authRouter);
app.use("/api/songs",songRouter);

//export 
module.exports=app;
