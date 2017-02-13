import { ON_MODAL_VISIBILITY_CHANGE } from '../actions/save-item-actions';

let initialState = {
	isModalVisible: false
};

export default function saveItem(state = initialState, action) {
  switch (action.type) {
    case ON_MODAL_VISIBILITY_CHANGE:
      return Object.assign({}, state, {
        isModalVisible: action.isVisible
      });
    default:
      return state
  }
}