import { 
	ON_MODE_CHANGE, 
	ON_USER_INPUT 
} from '../actions/global-actions';

const initialState = {
	mode: 'save',
	saveTerm: '',
	searchTerm: ''
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
		        saveTerm: action.value.toLowerCase()
		      });
    		case 'search':
    			return Object.assign({}, state, {
		        searchTerm: action.value.toLowerCase()
		      });
    	}
    default:
      return state
  }
}