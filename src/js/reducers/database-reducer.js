import { 
  ON_APP_DATA_LOADED, 
  ON_ITEM_SAVED,
  ON_SEARCH_RESULTS,
  ON_DELETE 
} from '../actions/database-actions';

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
        wordCount: action.data.wordCount,
        lastSavedWord: action.data.lastSavedWord
      });
    case ON_SEARCH_RESULTS: 
      return Object.assign({}, state, {
        searchResults: action.data.searchResults,
        isSearching: action.data.isSearching
      });
    case ON_DELETE:
      return Object.assign({}, state, {
        wordCount: action.wordCount
      });
    default:
      return state
  }
}