import React from 'react';
import './Loader.scss';

const Loader = ({ message = "Tuning into your vibes..." }) => {
  return (
    <div className="loader-container">
      <div className="loader-visual">
        <div className="mood-orb">
          <div className="orb-inner"></div>
          <div className="orb-glow"></div>
        </div>
        <div className="orbital-ring ring-1"></div>
        <div className="orbital-ring ring-2"></div>
        <div className="particles">
          <span className="dot dot-1"></span>
          <span className="dot dot-2"></span>
          <span className="dot dot-3"></span>
          <span className="dot dot-4"></span>
        </div>
      </div>
      <div className="loader-text-wrapper">
        <p className="loader-text">{message}</p>
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
