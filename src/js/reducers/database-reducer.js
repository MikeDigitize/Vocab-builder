import { ON_APP_DATA_LOADED, ON_ITEM_SAVED } from '../actions/database-actions';

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
    case ON_ITEM_SAVED:
      return Object.assign({}, state, {
        wordCount: ++state.wordCount,
        lastSavedWord: action.savedItem
      });
    default:
      return state
  }
}