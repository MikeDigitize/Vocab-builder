import { connect } from 'react-redux';
import VocabDatabase from '../../utils/database';
import { 
	onEditToggle, 
	onModalVisibilityChange, 
	onDataToEdit 
} from '../../actions/global-actions';
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

function mapDispatchToProps(dispatch) {
	return {
    onEditToggle({ isEditMode, result }) {
      dispatch(onDataToEdit(result));
    	dispatch(onEditToggle(isEditMode));
    	dispatch(onModalVisibilityChange(isEditMode));      
    }
	}
}

const ResultsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Results);

export default ResultsContainer;