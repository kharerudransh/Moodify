import React from 'react';
import FaceExpression from '../../expression/component/FaceExpression';
import Player from '../components/Player';
import Playlist from '../components/Playlist';   // naya import
import './Home.scss';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="player-section">
          <Player />
        </div>

        <div className="expression-section">
          <FaceExpression />
        </div>

        <div className="playlist-section">
          <Playlist />
        </div>
      </div>
    </div>
  );
};

export default Home;