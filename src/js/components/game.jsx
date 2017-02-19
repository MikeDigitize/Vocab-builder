import React, { PropTypes } from 'react';

const Game = ({ mode }) => (
  <div>
    <h2>Play game! { mode }</h2>
  </div>
);

Game.propTypes = {
  mode: PropTypes.bool.isRequired
};

export default Game;