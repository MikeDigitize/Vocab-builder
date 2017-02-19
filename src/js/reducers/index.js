import { combineReducers } from 'redux';
import globals from './global-reducer';
import database from './database-reducer';
import game from './game-reducer';

const vocabApp = combineReducers({ globals, database, game });
export default vocabApp;