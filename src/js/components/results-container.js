import { connect } from 'react-redux';
import Results from './results';

function mapStateToProps(state) {
  return {
    mode: state.globals.mode,
    lastSavedWord: state.database.lastSavedWord,
    wordCount: state.database.wordCount,
    searchResults: state.database.searchResults,
    isSearching: state.database.isSearching
  };
};

const ResultsContainer = connect(
  mapStateToProps
)(Results);

export default ResultsContainer;