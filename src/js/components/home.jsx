import React from 'react';
import ModeControl from './mode-control';
import TextInput from './text-input';
import Results from './results';
import Modal from './modal';

const Home = ({ 
	onChangeMode, 
	mode, 
	onUserInput, 
	saveTerm, 
	searchTerm, 
	onSubmitWord }) => (
	  <div className="col-xl-6 offset-xl-3">
	    <ModeControl onChangeMode={ onChangeMode } />
	    <TextInput 
	    	mode={ mode } 
	    	onUserInput={ onUserInput } 
	    	saveTerm={ saveTerm } 
	    	searchTerm={ searchTerm } 
	    	onSubmitWord={ onSubmitWord }
	    />
	    <Results />
	    <Modal />
	  </div>
);

export default Home;