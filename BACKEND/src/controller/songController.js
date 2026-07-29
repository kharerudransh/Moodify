const mongoose=require("mongoose");
const songModel = require("../models/song.model")
const id3=require("node-id3");
const storageService=require("../services/upload.ImageKit")


async function uploadSong(req, res) {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });

    }
    const { mood } = req.body;
    const userId = req.user.id;
    //id3.read se ham buffer ke andar ke saare data ko read karke use dekh sakte hai 
    console.log("new song")
    //console.log(req.file);
    const songBuffer=req.file.buffer;
    const tags=await id3.read(songBuffer);
    console.log(tags);

    const safeTitle = tags.title || req.file.originalname.replace(/\.[^/.]+$/, "");
    const artist = tags.artist || "Unknown Artist";
    const existingSong = await songModel.findOne({
        title: safeTitle,
        artist: artist,
        userId: userId
    });
    if (existingSong) {
        return res.status(409).json({ message: "This song already exists in your library" });
    }
    //ye code song ki fole aur poster ki file dono ko saath me upload karna start karta hai by using Promise.all
    // aur dono file ki upload completed hone ka wait karega
    const [songFile, posterFile] = await Promise.all([
        storageService.uploadFile({
            buffer: songBuffer,
            fileName: safeTitle,
            folder: "/moodify/songs"
        }),
        storageService.uploadFile({
            buffer: tags.image.imageBuffer,
            fileName: safeTitle,
            folder: "/moodify/posters"
        })
    ]);
    const song=await songModel.create({
        url:songFile.url,
        title:safeTitle,
        posterUrl:posterFile.url,
        artist:artist,
        mood:mood,
        userId:userId
    })

    return res.status(201).json({
        message:"Uploaded song successfully"
    })
        
}

async function getSongs(req,res){
    const mood=req.query.mood;
    const userId=req.user.id;
    console.log(mood)
    const songs=await songModel.find({mood:mood,userId:userId});
    return res.status(200).json({
        message:"Songs fetched successfully",
        songs
    })
    
}

async function getRandomSong(req,res){
    const mood=req.query.mood;
    if(!mood){
        return res.status(400).json({
            message:"Mood is required"
        })
    }
    const userId=req.user.id;
    const songs=await songModel.aggregate([
        {$match:{mood:mood,userId: new mongoose.Types.ObjectId(userId)}},
        {$sample:{size:1}}
    ])
    const song=songs[0];
    if (!song) {
        return res.status(404).json({
            message:"No song found"
        })
    }

    return res.status(200).json({
        message:"Random songs fetched successfully",
        song
    })
}

module.exports = { uploadSong ,getSongs,getRandomSong }
