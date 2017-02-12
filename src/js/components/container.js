import { connect } from 'react-redux';
import { onModeChange } from '../actions/global-actions';
import AppModeControl from './app-mode-control';

const mapStateToProps = (state, ownProps) => {
  return {
    mode: state.globals.mode
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChangeMode: mode => {
      dispatch(onModeChange(mode))
    }
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppModeControl);

export default Container;