import { ON_MODE_CHANGE } from '../actions/global-actions';

const initialState = {
	mode : 'save'
};

export default function globals(state = initialState, action) {
  switch (action.type) {
    case 'ON_MODE_CHANGE':
      return {
        mode: action.mode
      };
    default:
      return state
  }
}