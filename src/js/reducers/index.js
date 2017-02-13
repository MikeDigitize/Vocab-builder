import { combineReducers } from 'redux';
import globals from './global-reducer';
import saveItem from './save-item-reducer';
import database from './database-reducer';

const vocabApp = combineReducers({ globals, saveItem, database });
export default vocabApp;