import { connect } from 'react-redux';
import VocabDatabase from '../../utils/database';
import { 
  onUserInput,
  onModalVisibilityChange, 
  onDefinitionOrSynonymsUpdate, 
  onEditToggle,
  onModeChange,
  onDataToEdit
} from '../../actions/global-actions';
import { 
  onItemSaved, 
  onDelete, 
  onSearchResults 
} from '../../actions/database-actions';
import Modal from './modal';

function mapStateToProps(state) {
  return {
    saveItem: state.globals.saveItem,
    searchItem: state.globals.searchItem,
    isModalVisible: state.globals.isModalVisible,
    isSearching: state.database.isSearching,
    isEditMode: state.globals.isEditMode,
    definitionAndSynonymsData: state.globals.definitionAndSynonymsData,
    editItem: state.globals.editItem
  };
}

function mapDispatchToProps(dispatch) {
  return {
  	onUserInput(value) {
      dispatch(onUserInput(value));
    },
    onDefinitionOrSynonymsUpdate(data) {
      dispatch(onDefinitionOrSynonymsUpdate(data));
    },
    onModalClose() {

      dispatch(onModalVisibilityChange(false));
      dispatch(onDefinitionOrSynonymsUpdate({ definition: '', synonyms: '' }));

    },
    onItemSave({ item, isEditMode, searchItem }) {

      const lastSavedWord = Object.keys(item)[0];
      item[lastSavedWord].isLatestWord = true;

      // save new word and update latest item flag
      VocabDatabase
        .iterate(function(data, word) {
          if(data.isLatestWord) {
            data.isLatestWord = false;
            VocabDatabase.set(word, data);
          }
        })
        .then(() => VocabDatabase.set(lastSavedWord, item[lastSavedWord]))
        .then(() => VocabDatabase.keys())

        // update search results (can save from edit mode so is necessary)
        .then(function(keys) {

          const wordCount = keys.length; 
          let searchResults = [];

          function onDatabaseSearched() {

            const isSearching = !!searchItem.length; 
            dispatch(onSearchResults({ searchResults, isSearching }));
            dispatch(onItemSaved({ lastSavedWord, wordCount }));
            dispatch(onDefinitionOrSynonymsUpdate({ 
              definition: '', 
              synonyms: '' 
            }));

            // if not in edit mode reset current save item as it's now been saved
            if(!isEditMode) {
              dispatch(onUserInput(''));
            }

            dispatch(onModalVisibilityChange(false));
            dispatch(onEditToggle(false));

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

        });

    },
    onEditToggle({ isEditMode }) {

      dispatch(onDefinitionOrSynonymsUpdate({ 
        definition: '', 
        synonyms: '' 
      }));
      dispatch(onEditToggle(isEditMode));
      dispatch(onModalVisibilityChange(isEditMode));    

    },
    onDelete({ currentItem, searchItem }) {

      let isLatestWord = false;
      let wordCount;

      // check if word to delete is the last saved word
      VocabDatabase
        .iterate(function(data, word) {
          if(data.isLatestWord) {
            if(word === currentItem) {
              isLatestWord = true;
            }
          }
        })

        // remove word from database
        .then(() => VocabDatabase.remove(currentItem))
        .then(() => VocabDatabase.keys())

        // save new word count and set latest word if necessary
        .then(function(keys) {
          wordCount = keys.length;
          dispatch(onDelete(wordCount));
          if(isLatestWord) {
            dispatch(onItemSaved({ lastSavedWord: '', wordCount }));
          }
        })

        // get updated search results 
        .then(function() {

          let searchResults = [];

          function onDatabaseSearched() {
            const isSearching = !!searchItem.length; 
            dispatch(onSearchResults({ searchResults, isSearching }));

            // close modal
            dispatch(onDefinitionOrSynonymsUpdate({ 
              definition: '', 
              synonyms: '' 
            }));
            dispatch(onEditToggle(false));
            dispatch(onModalVisibilityChange(false));  
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

        });

    }
  }
}

const ModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);

export default ModalContainer;