const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false
    }
    
});


// ye ek line hai jo database me data save hone se phele chalti hai to change something like changing password in hash
//userSchema.pre("save",function(next){});

const userModel=mongoose.model("users",userSchema);
module.exports=userModel;