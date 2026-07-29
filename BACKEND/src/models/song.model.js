const mongoose=require("mongoose");
const songSchema=new mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    title:{
        type:String,
        require:true
    },
    posterUrl:{
        type:String,
        required:true
    },
    artist:{
        type:String,
        required:true
    },
    mood:{
        type:String,
        enum:{
            values:["sad","happy","party","surprised","neutral"],
            message:"{VALUE} is not a valid mood"
        },
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
    
},{
    timestamps:true
});

const songModel=mongoose.model("Song",songSchema);
module.exports=songModel;
