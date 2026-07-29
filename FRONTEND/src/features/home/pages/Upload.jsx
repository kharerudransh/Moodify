import React from 'react'
import { useNavigate } from 'react-router';
import { useSong } from '../hooks/useSong';
import { useState ,useRef } from 'react';
import { toast } from 'react-toastify';
import './Upload.scss';

const Upload = () => {
    const[mood ,setMood]=useState("");
    const uplaodSongInputFieldRef=useRef(null);
    const [previewImage,setPreviewImage]=useState(null);
    const navigate=useNavigate();

    //get data from useSong
    const {loading,handleUpload}=useSong();

    //handle file select
    function handleFileChange(e){
        const file=e.target.files[0];
        if(file){
            setPreviewImage(URL.createObjectURL(file));
        }
    }

    //handle submit
    async function handleSubmit(e) {
    e.preventDefault();
    const songFile = uplaodSongInputFieldRef.current.files[0];

    if (!songFile || !mood) {
        toast.error("Please select a file and a mood");
        return;
    }

    try {
        await handleUpload(songFile, mood);
        toast.success("Song uploaded successfully");
        setMood("");
        setPreviewImage(null);
        navigate("/");
    } catch (err) {
        console.error(err);
        toast.error(err?.message || "Upload failed");
    }
}
  return (
    <div className="upload-container">
        <h1>Upload song</h1>
        <form action="" onSubmit={handleSubmit}>
            <label className='uploadSongLabel' htmlFor="uploadSong">
                <span>Add Song</span>
            </label>
            <input ref={uplaodSongInputFieldRef} type="file" id='uploadSong'
            hidden
            accept='audio/*'
            onChange={handleFileChange}
            />

            {previewImage && (
                <audio controls src={previewImage} />
            )}

            <input type="text" className='mood'
            onInput={(e)=>{setMood(e.target.value.toLowerCase())}}
            value={mood}
            placeholder='Enter mood --Happy/Sad/Party/Surprised/Neutral--'
            />
            <button type='submit'>
                Upload
            </button>
            

        </form>
    </div>
  )
}

export default Upload