import React from "react";
import { useSong } from "../hooks/useSong";
import { FaMusic } from "react-icons/fa";
import "./Playlist.scss";

const Playlist = () => {
  const { mood, playList, currentIndex, setCurrentIndex, setIsPlaying, setSong } = useSong();

  function handleSongClick(index) {
    setCurrentIndex(index);
    setSong(playList[index]);
    setIsPlaying(true);
  }

  if (!playList || playList.length === 0) {
    return (
      <div className="playlist-placeholder-card">
        <FaMusic className="placeholder-icon" />
        <h3>No Playlist Yet</h3>
        <p>Detect your expression to get a mood-based playlist here.</p>
      </div>
    );
  }

  return (
    <div className="playlist-card">
      <h3>
        {mood ? `${mood.charAt(0).toUpperCase() + mood.slice(1)} Playlist` : "Playlist"}
      </h3>
      <div className="playlist-items">
        {playList.map((song, index) => (
          <div
            key={song._id || index}
            className={`playlist-item ${index === currentIndex ? "active" : ""}`}
            onClick={() => handleSongClick(index)}
          >
            <img src={song.posterUrl} alt={song.title} />
            <div className="playlist-item-info">
              <p className="title">{song.title}</p>
              <p className="artist">{song.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlist;