import React from 'react';
import './Loader.scss';

const Loader = ({ message = "Tuning into your rhythm..." }) => {
  return (
    <div className="music-loader-container">
      <div className="music-loader-content">
        
        {/* Headphone and Vinyl Wrap */}
        <div className="vinyl-player-wrapper">
          {/* Glowing Equalizer Pulse Ring */}
          <div className="pulse-ring ring-1"></div>
          <div className="pulse-ring ring-2"></div>
          <div className="pulse-ring ring-3"></div>

          {/* Headphones Outline */}
          <div className="headphone-body">
            <div className="headphone-band"></div>
            <div className="earcup earcup-left"></div>
            <div className="earcup earcup-right"></div>
          </div>

          {/* Spinning Vinyl Record */}
          <div className="vinyl-disc">
            <div className="vinyl-groove-1"></div>
            <div className="vinyl-groove-2"></div>
            <div className="vinyl-groove-3"></div>
            <div className="vinyl-center-label">
              <div className="vinyl-center-hole"></div>
            </div>
            <div className="vinyl-gloss"></div>
          </div>

          {/* Floating Music Notes */}
          <div className="floating-notes">
            <span className="note note-1">♪</span>
            <span className="note note-2">♫</span>
            <span className="note note-3">♬</span>
            <span className="note note-4">♩</span>
          </div>
        </div>

        {/* Loading Bars / Equalizer */}
        <div className="loader-equalizer">
          <div className="eq-bar bar-1"></div>
          <div className="eq-bar bar-2"></div>
          <div className="eq-bar bar-3"></div>
          <div className="eq-bar bar-4"></div>
          <div className="eq-bar bar-5"></div>
        </div>

        {/* Text */}
        <div className="loader-text-container">
          <h2 className="loading-title">Moodify</h2>
          <p className="loading-subtitle">{message}</p>
        </div>
        
      </div>
    </div>
  );
};

export default Loader;
