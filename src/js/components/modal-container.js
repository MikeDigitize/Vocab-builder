import { connect } from 'react-redux';
import VocabDatabase from '../utils/database';
import { 
  onUserInput,
  onModalVisibilityChange, 
  onSaveItemData, 
  onEditToggle,
  onModeChange } from '../actions/global-actions';
import { onItemSaved, onDelete } from '../actions/database-actions';
import Modal from './modal';

function mapStateToProps(state) {
  return {
    saveItem: state.globals.saveItem,
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
    onItemSave({ item, isEditMode }) {
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