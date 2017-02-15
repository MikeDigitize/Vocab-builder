import { combineReducers } from 'redux';
import globals from './global-reducer';
import database from './database-reducer';

const vocabApp = combineReducers({ globals, database });
export default vocabApp;