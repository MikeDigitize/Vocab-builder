import { connect } from 'react-redux';
import VocabDatabase from '../../utils/database';
import { onUserInput } from '../../actions/global-actions';
import { onModalVisibilityChange } from '../../actions/global-actions';
import { onSearchResults } from '../../actions/database-actions';
import TextInput from './text-input';

function mapStateToProps(state) {
  return {
    mode: state.globals.mode,
    saveItem: state.globals.saveItem,
    searchItem: state.globals.searchItem
  };
}

function mapDispatchToProps(dispatch) {
  return {
  	onUserInput(value) {
      dispatch(onUserInput(value));
    },
    onSearch(searchItem) {

			let searchResults = [];

			function onDatabaseSearched() {
				const isSearching = !!searchItem.length; 
				dispatch(onSearchResults({ searchResults, isSearching }));
			}

			if(searchItem.length) {

				VocabDatabase
					.iterate(function(data, word) {
						const find = new RegExp(`^${searchItem}`, 'i');
						if(word.match(find)) {
							searchResults.push({ word, data });
						}
					})
					.then(onDatabaseSearched);
					
			}
			else {
				onDatabaseSearched();
			}		

		},
		onSubmitItem() {
      dispatch(onModalVisibilityChange(true));
    }
  }
}

const TextInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TextInput);

export default TextInputContainer;