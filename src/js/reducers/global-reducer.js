import { 
	ON_MODE_CHANGE, 
	ON_USER_INPUT,
  ON_MODAL_VISIBILITY_CHANGE,
  ON_EDIT_TOGGLE,
  ON_DEFINITION_OR_SYNONYMS_UPDATE,
  ON_DATA_TO_EDIT 
} from '../actions/global-actions';
import { removeSpecialChars } from '../utils/validation';

let initialState = {
	mode: 'save',
	saveItem: '',
	searchItem: '',
  isModalVisible: false,
  isEditMode: false,
  definitionAndSynonymsData: { definition: '', synonyms: '' },
  editItem: ''
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
          if(state.isEditMode) {
            return Object.assign({}, state, {
              editItem: removeSpecialChars(action.value).toLowerCase()
            });
          }
    			return Object.assign({}, state, {
		        searchItem: removeSpecialChars(action.value).toLowerCase()
		      });
    	}
      case ON_MODAL_VISIBILITY_CHANGE:
        return Object.assign({}, state, {
          isModalVisible: action.isVisible
        });
      case ON_EDIT_TOGGLE:
        return Object.assign({}, state, {
          isEditMode: action.isEditMode
        });
      case ON_DEFINITION_OR_SYNONYMS_UPDATE:
        return Object.assign({}, state, {
          definitionAndSynonymsData: {
            definition: removeSpecialChars(action.data.definition),
            synonyms: removeSpecialChars(action.data.synonyms)
          }
        });
      case ON_DATA_TO_EDIT:
        return Object.assign({}, state, {
          definitionAndSynonymsData: {
            definition: action.edit.data.definition,
            synonyms: action.edit.data.synonyms.join(', ')
          },
          editItem: action.edit.word
        });
    default:
      return state
  }
}