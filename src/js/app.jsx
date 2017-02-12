import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import vocabApp from './reducers';
import Root from './components/root';
import '../scss/global';

let store = createStore(vocabApp);

ReactDOM.render(
	<Provider store={ store }>
		<Root />
	</Provider>, 
	document.getElementById('vocab')
);