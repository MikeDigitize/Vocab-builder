import { connect } from 'react-redux';
import { 
  onModeChange, 
  onUserInput 
} from '../actions/global-actions';
import VocabDatabase from '../utils/database';
import { onModalVisibilityChange } from '../actions/save-term-actions';
import { onAppDataLoaded, onItemSaved } from '../actions/database-actions';
import Home from './home';

function mapStateToProps(state) {
  return {
    mode: state.globals.mode,
    saveItem: state.globals.saveItem,
    searchItem: state.globals.searchItem,
    isModalVisible: state.saveItem.isModalVisible,
    lastSavedWord: state.database.lastSavedWord,
    wordCount: state.database.wordCount,
    searchResults: state.database.searchResults,
    isSearching: state.database.isSearching,
    isAppDataLoaded: state.database.isAppDataLoaded
  };
};

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onAppInitialise() {
      let lastSavedWord = '';
      VocabDatabase.iterate(function(data, word) {
        if(data.isLatestWord) {
          lastSavedWord = word;
        }
      })
      .then(() => VocabDatabase.keys())
      .then(function(keys) {
        const wordCount = keys.length;  
        dispatch(onAppDataLoaded({ wordCount, lastSavedWord }));          
      });
    },
    onChangeMode(mode) {
      dispatch(onModeChange(mode));
    },
    onUserInput(value) {
      dispatch(onUserInput(value));
    },
    onSubmitWord() {
      dispatch(onModalVisibilityChange(true));
    },
    onModalClose() {
      dispatch(onModalVisibilityChange(false));
    },
    onItemSave(item) {
      let latestWord = Object.keys(item)[0];
      item[latestWord].isLatestWord = true;
      VocabDatabase.iterate(function(data, word) {
        if(data.isLatestWord) {
          data.isLatestWord = false;
          VocabDatabase.set(word, data);
        }
      })
      .then(() => VocabDatabase.set(latestWord, item[latestWord]))
      .then(function() {
        dispatch(onModalVisibilityChange(false));
        dispatch(onItemSaved(latestWord));
        dispatch(onUserInput(''));
      });
    }
  }
};

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default HomeContainer;