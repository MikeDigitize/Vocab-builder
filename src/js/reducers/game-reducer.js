import { ON_GAME_DATA_LOADED } from '../actions/game-actions';

let initialState = {
  inPlay: false,
  isComplete: false,
  score: 0,
  currentQuestion: 0,
  words: [],
  questions: [],
  answer: [],
  isGameDataLoaded: false
};

export default function game(state = initialState, action) {
  switch (action.type) {
    case ON_GAME_DATA_LOADED:
      return Object.assign({}, state, {
        inPlay: action.data.inPlay,
        isComplete: action.data.isComplete,
        score: action.data.score,
        currentQuestion: action.data.currentQuestion,
        words: action.data.words,
        questions: action.data.questions,
        answer: action.data.answer,
        isGameDataLoaded: true
      });
    default:
      return state
  }
}