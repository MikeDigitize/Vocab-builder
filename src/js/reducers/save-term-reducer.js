import { 
	ON_MODAL_VISIBILITY_CHANGE
} from '../actions/save-term-actions';

const initialState = {
	modalVisible: false
};

export default function saveTerm(state = initialState, action) {
  switch (action.type) {
    case ON_MODAL_VISIBILITY_CHANGE:
      return Object.assign({}, state, {
        modalVisible: action.visible
      });
    default:
      return state
  }
}