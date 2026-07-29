import {createContext,useContext} from "react";

import { useState } from "react";

export const songContext = createContext();
export const SongContextProvider=({children})=>{
    const[song,setSong]=useState(
        /** * Paste one or more documents here*/
        {
        "url": "https://ik.imagekit.io/bcyzdf1s5/moodify/songs/Jatt_Mehkma__RiskyjaTT.CoM__be4ECgpdE",
        "title": "Jatt Mehkma (RiskyjaTT.CoM)",
        "posterUrl": "https://ik.imagekit.io/bcyzdf1s5/moodify/posters/Jatt_Mehkma__RiskyjaTT.CoM__9gVFbnik9",
        "artist": "Yo Yo Honey Singh (RiskyjaTT.CoM)",
        "mood": "party"
        });  
        const[mood,setMood]=useState(null)
        const [playList, setPlayList] = useState([]);           // ✅ poori playlist (array)
        const [currentIndex, setCurrentIndex] = useState(0); // ✅ playlist mein kaunsa song chal raha hai
        const [isPlaying, setIsPlaying] = useState(false);   // ✅ play/pause state
        const [loading, setLoading] = useState(false);

        
    
    return(
        <songContext.Provider 
            value={{
                song,setSong,loading,setLoading,playList,setPlayList,currentIndex,setCurrentIndex,isPlaying,setIsPlaying,mood,setMood
            }}>
            {children}      
        </songContext.Provider>
    )
}