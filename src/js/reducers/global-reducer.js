import { 
	ON_MODE_CHANGE, 
	ON_USER_INPUT,
  ON_MODAL_VISIBILITY_CHANGE 
} from '../actions/global-actions';
import { removeSpecialChars } from '../utils/validation';

let initialState = {
	mode: 'save',
	saveItem: '',
	searchItem: '',
  isModalVisible: false
};

export default function globals(state = initialState, action) {
  switch (action.type) {
    case ON_MODE_CHANGE:
      return Object.assign({}, state, {
        mode: action.mode
      });
    case ON_USER_INPUT:
    	switch(state.mode) {
    		case 'save':
    			return Object.assign({}, state, {
		        saveItem: removeSpecialChars(action.value).toLowerCase()
		      });
    		case 'search':
    			return Object.assign({}, state, {
		        searchItem: removeSpecialChars(action.value).toLowerCase()
		      });
    	}
      case ON_MODAL_VISIBILITY_CHANGE:
        return Object.assign({}, state, {
          isModalVisible: action.isVisible
        });
    default:
      return state
  }
}