import { connect } from 'react-redux';
import { onModeChange } from '../../actions/global-actions';
import ModeControl from './mode-control';

function mapDispatchToProps(dispatch) {
  return {
    onChangeMode(mode) {
      dispatch(onModeChange(mode));
    }
  };
};

const ModeControlContainer = connect(
	null,
  mapDispatchToProps
)(ModeControl);

export default ModeControlContainer;