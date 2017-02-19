import VocabDatabase from './database';
import { ON_APP_DATA_LOADED } from '../actions/database-actions';
export const GIF_GAB_STATE_KEY = '__STATE__';

export default function SaveStoreToLocal(store) {
	return function(dispatch) {
		return function(action) {
			//console.log(action);	
			return dispatch(action);
		}
	}
}