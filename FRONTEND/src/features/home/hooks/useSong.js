import { getSong ,getPlaylist,uploadSong} from "../service/song.api";
import {useContext} from "react";
import {songContext} from "../Song.context"


export const useSong=()=>{

    const context=useContext(songContext);
    const{song,setSong,loading,setLoading,playList,setPlayList,currentIndex,setCurrentIndex,isPlaying,setIsPlaying,mood,setMood}=context;
    async function handleGetSong({mood}){
        setLoading(true);
        try{
            const response=await getSong({mood});
            setSong(response.song);
            setIsPlaying(true);
        }
        catch(err){
            console.error(err);
            throw err;
        }
        finally{
            setLoading(false);
        }
    }
    async function handlePlayList({mood}){
        setLoading(true);
        try{
            const response=await getPlaylist({mood});
            const songs = response.songs || [];
            setPlayList(songs);
            if (songs.length > 0) {
                setSong(songs[0]);
                setCurrentIndex(0);
                setIsPlaying(true);
            } else {
                setIsPlaying(false);
            }
        }
        catch(err){
            console.error(err);
            throw err
        }
        finally{
            setLoading(false);
        }
    }

    //handleUpload

    async function handleUpload(songFile,mood){
        setLoading(true);
        try{
            const response=await uploadSong({songFile,mood});
            return response
        }
        catch(err){
            console.error(err);
            throw err
        }
        finally{
            setLoading(false);
        }
    }


    return {
    mood,setMood,
    song, setSong,
    playList, setPlayList,
    currentIndex, setCurrentIndex,
    isPlaying, setIsPlaying,
    loading, setLoading,
    handleGetSong,
    handlePlayList,
    handleUpload
};
    
    
}