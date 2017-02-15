import { connect } from 'react-redux';
import VocabDatabase from '../utils/database';
import { onUserInput } from '../actions/global-actions';
import { onModalVisibilityChange } from '../actions/global-actions';
import { onItemSaved } from '../actions/database-actions';
import Modal from './modal';

function mapStateToProps(state) {
  return {
    saveItem: state.globals.saveItem,
    isModalVisible: state.globals.isModalVisible,
    isSearching: state.database.isSearching
  };
}

function mapDispatchToProps(dispatch) {
  return {
  	onUserInput(value) {
      dispatch(onUserInput(value));
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
}

const ModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);

export default ModalContainer;