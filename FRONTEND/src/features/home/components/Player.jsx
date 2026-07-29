import React, { useRef, useEffect, useState } from 'react';
import { useSong } from '../hooks/useSong';
import { 
  FaPlay, 
  FaPause, 
  FaStepForward, 
  FaStepBackward, 
  FaForward, 
  FaBackward, 
  FaVolumeUp, 
  FaVolumeMute,
  FaMusic
} from 'react-icons/fa';
import './Player.scss';

const Player = () => {
  const {
    song,
    setSong,
    playList,
    currentIndex,
    setCurrentIndex,
    isPlaying,
    setIsPlaying
  } = useSong();

  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  // Sync play/pause state
  useEffect(() => {
  if (!audioRef.current) return;

  audioRef.current.load();

  if (isPlaying) {
    audioRef.current.play().catch(err => {
      console.warn("Playback prevented or interrupted:", err);
    });
  } else {
    audioRef.current.pause();
  }
}, [song?.url, isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (playList.length === 0) return;
    const nextIdx = (currentIndex + 1) % playList.length;
    setCurrentIndex(nextIdx);
    setSong(playList[nextIdx]);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    if (playList.length === 0) return;
    const prevIdx = (currentIndex - 1 + playList.length) % playList.length;
    setCurrentIndex(prevIdx);
    setSong(playList[prevIdx]);
    setIsPlaying(true);
  };

  const skipForward = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.min(
      audioRef.current.duration || 0,
      audioRef.current.currentTime + 5
    );
  };

  const skipBackward = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 5);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeekChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
      audioRef.current.muted = newVol === 0;
      setIsMuted(newVol === 0);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    audioRef.current.muted = newMuteState;
  };

  const selectSongFromPlaylist = (index) => {
    setCurrentIndex(index);
    setSong(playList[index]);
    setIsPlaying(true);
  };

  const formatTime = (secs) => {
    if (isNaN(secs)) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!song) {
    return (
      <div className="player-empty">
        <FaMusic className="empty-icon" />
        <p>No song loaded. Detect your mood to play music!</p>
      </div>
    );
  }

  return (
    <div className="player-card">
      <audio
        ref={audioRef}
        src={song.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleNext}
      />

      <div className="player-header">
        <span className="now-playing-tag">Now Playing</span>
        {song.mood && (
          <span className={`mood-badge ${song.mood.toLowerCase()}`}>
            {song.mood.toUpperCase()}
          </span>
        )}
      </div>

      <div className="vinyl-section">
        <div className={`vinyl-record ${isPlaying ? 'spinning' : 'paused'}`}>
          <img 
            src={song.posterUrl || 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17'} 
            alt={song.title} 
            className="vinyl-poster" 
          />
          <div className="vinyl-center"></div>
        </div>
      </div>

      <div className="song-info">
        <h3 className="song-title">{song.title}</h3>
        <p className="song-artist">{song.artist}</p>
      </div>

      <div className="progress-section">
        <span className="time-display">{formatTime(currentTime)}</span>
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={handleSeekChange}
          className="seeker-bar"
        />
        <span className="time-display">{formatTime(duration)}</span>
      </div>

      <div className="controls-section">
        <button 
          onClick={handlePrev} 
          className="control-btn prev-btn" 
          title="Previous Song"
          disabled={playList.length <= 1}
        >
          <FaStepBackward />
        </button>

        <button 
          onClick={skipBackward} 
          className="control-btn skip-btn" 
          title="Rewind 5s"
        >
          <FaBackward />
          <span className="skip-label">5s</span>
        </button>

        <button 
          onClick={togglePlay} 
          className="control-btn play-btn" 
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <FaPause className="play-icon" /> : <FaPlay className="play-icon" />}
        </button>

        <button 
          onClick={skipForward} 
          className="control-btn skip-btn" 
          title="Fast Forward 5s"
        >
          <FaForward />
          <span className="skip-label">5s</span>
        </button>

        <button 
          onClick={handleNext} 
          className="control-btn next-btn" 
          title="Next Song"
          disabled={playList.length <= 1}
        >
          <FaStepForward />
        </button>
      </div>

      <div className="volume-section">
        <button onClick={toggleMute} className="volume-btn" title={isMuted ? "Unmute" : "Mute"}>
          {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="volume-slider"
        />
      </div>

      {playList.length > 0 && (
        <div className="playlist-queue">
          <div className="queue-title">
            <FaMusic /> Queue ({playList.length} Songs)
          </div>
          <div className="queue-list">
            {playList.map((s, index) => (
              <div 
                key={s._id || index} 
                className={`queue-item ${index === currentIndex ? 'active' : ''}`}
                onClick={() => selectSongFromPlaylist(index)}
              >
                <img src={s.posterUrl} alt={s.title} className="queue-item-poster" />
                <div className="queue-item-info">
                  <p className="queue-item-title">{s.title}</p>
                  <p className="queue-item-artist">{s.artist}</p>
                </div>
                {index === currentIndex && isPlaying && (
                  <div className="playing-bars">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;