import { connect } from 'react-redux';
import Game from './game';

const mapStateToProps = state => {
  return {
    mode: state.globals.mode
  }
}

const GameContainer = connect(
  mapStateToProps
)(Game);

export default GameContainer;