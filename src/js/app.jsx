import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import vocabApp from './reducers';
import Root from './components/root';
import SaveStoreToLocal from './utils/save-store-to-local';
import '../scss/global';

let store = createStore(vocabApp, applyMiddleware(SaveStoreToLocal));

ReactDOM.render(
	<Provider store={ store }>
		<Root />
	</Provider>, 
	document.getElementById('vocab')
);