import { connect } from 'react-redux';
import Edit from './edit';

const mapStateToProps = state => {
  return {
    mode: state.globals.mode
  }
}

const EditContainer = connect(
  mapStateToProps
)(Edit);

export default EditContainer;