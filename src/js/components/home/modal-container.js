import { connect } from 'react-redux';
import VocabDatabase from '../../utils/database';
import { 
  onUserInput,
  onModalVisibilityChange, 
  onSaveItemData, 
  onEditToggle,
  onModeChange } from '../../actions/global-actions';
import { 
  onItemSaved, 
  onDelete, 
  onSearchResults } from '../../actions/database-actions';
import Modal from './modal';

function mapStateToProps(state) {
  return {
    saveItem: state.globals.saveItem,
    searchItem: state.globals.searchItem,
    isModalVisible: state.globals.isModalVisible,
    isSearching: state.database.isSearching,
    isEditMode: state.globals.isEditMode,
    saveItemData: state.globals.saveItemData
  };
}

function mapDispatchToProps(dispatch) {
  return {
  	onUserInput(value) {
      dispatch(onUserInput(value));
    },
    onSaveItemData(data) {
      dispatch(onSaveItemData(data));
    },
    onModalClose() {
      dispatch(onModalVisibilityChange(false));
      dispatch(onSaveItemData({ definition: '', synonyms: '' }));
    },
    onItemSave({ item, isEditMode, searchItem }) {
      const lastSavedWord = Object.keys(item)[0];
      item[lastSavedWord].isLatestWord = true;
      VocabDatabase.iterate(function(data, word) {
        if(data.isLatestWord) {
          data.isLatestWord = false;
          VocabDatabase.set(word, data);
        }
      })
      .then(() => VocabDatabase.set(lastSavedWord, item[lastSavedWord]))
      .then(() => VocabDatabase.keys())
      .then(function(keys) {
        const wordCount = keys.length; 
        let searchResults = [];
        function onDatabaseSearched() {
          const isSearching = !!searchItem.length; 
          dispatch(onSearchResults({ searchResults, isSearching }));
        }
        if(searchItem.length) {
          VocabDatabase.iterate(function(data, word) {
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
        dispatch(onItemSaved({ lastSavedWord, wordCount }));
        dispatch(onUserInput(''));
        dispatch(onSaveItemData({ 
          definition: '', 
          synonyms: '' 
        }));
        if(isEditMode) {
          dispatch(onModeChange('search')); 
        }
        dispatch(onModalVisibilityChange(false));
      });
    },
    onEditToggle({ isEditMode }) {
      dispatch(onSaveItemData({ 
        definition: '', 
        synonyms: '' 
      }));
      dispatch(onUserInput(''));
      dispatch(onModeChange('search'));  
      dispatch(onEditToggle(isEditMode));
      dispatch(onModalVisibilityChange(isEditMode));      
    },
    onDelete({ saveItem, onEditToggle }) {
      VocabDatabase.remove(saveItem)
      .then(() => VocabDatabase.keys())
      .then(function(keys) {
        const wordCount = keys.length;
        dispatch(onDelete({ saveItem, wordCount }));
        onEditToggle({ isEditMode: false });
      });
    }
  }
}

const ModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);

export default ModalContainer;