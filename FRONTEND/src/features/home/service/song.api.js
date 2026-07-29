import axios from "axios";

const api=axios.create({
    baseURL:"http://localhost:3000/api/songs",
    withCredentials:true
    
})
//get random song based on mood --> /random?mood=happy
export async function getSong({mood}){
    const response=await api.get("/random?mood="+mood);
    return response.data
}

//get playlist based on mood --> /playlist?mood=happy
export async function getPlaylist({mood}){
    const response=await api.get("/playlist?mood="+mood);
    return response.data
}

//upload song -->/upload
export async function uploadSong({songFile,mood}) {
    try{
        const formData=new FormData();
        formData.append("song",songFile);
        formData.append("mood",mood);

        const response=await api.post("/upload",formData)
        return response.data;
    }
    catch(err){
        throw err;
    }
}