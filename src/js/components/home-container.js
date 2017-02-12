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
    modalVisible: state.saveTerm.modalVisible
  };
};

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onChangeMode: function(mode) {
      dispatch(onModeChange(mode));
    },
    onUserInput: function(evt) {
      dispatch(onUserInput(evt.target.value));
    },
    onSubmitWord: function() {
      dispatch(onModalVisibilityChange(true));
    }
  }
};

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default HomeContainer;