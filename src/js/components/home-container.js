import { connect } from 'react-redux';
import { globalDispatchers } from '../actions/global-actions';
import { saveItemDispatchers } from '../actions/save-item-actions';
import { databaseDispatchers } from '../actions/database-actions';
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

function combineDispatchers(...dispatchers) {
  return dispatchers.reduce(function(combined, dispatcher) {
    return Object.assign(combined, dispatcher);
  }, {});
}

function mapDispatchToProps(dispatch) {
  return combineDispatchers(
    globalDispatchers(dispatch),
    saveItemDispatchers(dispatch),
    databaseDispatchers(dispatch)
  );
};

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default HomeContainer;