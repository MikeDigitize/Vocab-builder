import { connect } from 'react-redux';
import Game from './game/game';

const mapStateToProps = state => {
  return {
    inPlay: state.game.inPlay,
    isComplete: state.game.isComplete,
    score: state.game.score,
    currentQuestion: state.game.currentQuestion,
    words: state.game.words,
    questions: state.game.questions,
    answer: state.game.answer,
    isGameDataLoaded: state.game.isGameDataLoaded
  };
}

const GameContainer = connect(
  mapStateToProps
)(Game);

export default GameContainer;