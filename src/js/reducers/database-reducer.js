import { ON_APP_DATA_LOADED } from '../actions/database-actions';

let initialState = {
    lastSavedWord: '',
    wordCount: 0,
    searchResults: [],
    isSearching: false,
    isAppDataLoaded: false
};

export default function database(state = initialState, action) {
  switch (action.type) {
    case ON_APP_DATA_LOADED:
      return Object.assign({}, state, {
        wordCount: action.data.wordCount,
        lastSavedWord: action.data.lastSavedWord,
        isAppDataLoaded: true
      });
    default:
      return state
  }
}