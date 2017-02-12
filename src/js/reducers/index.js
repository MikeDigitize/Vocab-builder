import { combineReducers } from 'redux';
import globals from './global-reducers';

const vocabApp = combineReducers({ globals });
export default vocabApp;