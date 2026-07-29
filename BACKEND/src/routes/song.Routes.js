const express = require("express");
const songModel = require("../models/song.model");
const upload=require("../middleware/upload.middleware")
const songController=require("../controller/songController");
const { authUser } = require("../middleware/auth.middleware");

const router = express.Router();

//Post --> /api/songs/
//Uploading songs --> /api/songs/upload
router.post("/upload",authUser,upload.single("song"),songController.uploadSong)

//Get-->/api/songs/
// Getting random song on the basis of mood
router.get("/random",authUser,songController.getRandomSong) 


//Get-->/api/songs/playlist
//to get the songs according to the mood
router.get("/playlist",authUser,songController.getSongs)   


module.exports = router;