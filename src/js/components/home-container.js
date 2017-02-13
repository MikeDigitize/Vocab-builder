import { connect } from 'react-redux';
import { 
  onModeChange, 
  onUserInput 
} from '../actions/global-actions';
import { onModalVisibilityChange } from '../actions/save-term-actions';
import Home from './home';

function mapStateToProps(state) {
  return {
    mode: state.globals.mode,
    saveTerm: state.globals.saveTerm,
    searchTerm: state.globals.searchTerm,
    isModalVisible: state.saveTerm.isModalVisible
  };
};

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onChangeMode: function(mode) {
      dispatch(onModeChange(mode));
    },
    onUserInput: function(value) {
      dispatch(onUserInput(value));
    },
    onSubmitWord: function() {
      dispatch(onModalVisibilityChange(true));
    },
    onModalClose: function() {
      dispatch(onModalVisibilityChange(false));
    },
    onTermSave: function(term) {
      console.log('term!', term);
    }
  }
};

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default HomeContainer;