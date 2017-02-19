import React, { PropTypes } from 'react';
import Tick from './tick';
import styles from '../../../scss/game';

const Game = () => (
  <div className="col-xl-6 offset-xl-3 game-container">
  	<p className="subtitle">Level up your gift!</p>
    <h1 className="title">Gab Builder</h1>
    <div className={ `${styles.gameHolder}` }>
	    <div className={ `${styles.scoreContainer}` }>
	    	<p className={ `${styles.score}` }>Your score: <span className={ `${styles.points}` }>0</span>/10</p>
	    </div>
	    <div className={ `${styles.questions}` }>
	    	<p className={ `${styles.question}` }>What word does this description best fit?</p>
	    	<p className={ `${styles.questionClue}` }>The state of feeling remorseful and penitent.</p>
	    	<hr />
	    	<ol className={ `${styles.answers}` }>
	    		<li>abstemious <Tick /></li>
	    		<li>contrition <Tick /></li>
	    		<li>idempotent <Tick /></li>
	    		<li>luculent <Tick /></li>
	    	</ol>
	    	<hr />
	    </div>
	    <p className={ `${styles.questionNumber}` }>Question: 1/10</p>
	    <button className="btn btn-success { `${styles.playAgain}` }">Play again</button>
	  </div>
  </div>
);

// Game.propTypes = {
//   mode: PropTypes.string.isRequired
// };

export default Game;