import { combineReducers } from 'redux';
import globals from './global-reducer';
import saveTerm from './save-term-reducer';

const vocabApp = combineReducers({ globals, saveTerm });
export default vocabApp;