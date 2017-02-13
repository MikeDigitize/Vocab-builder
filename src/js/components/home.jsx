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
	onSubmitWord,
	isModalVisible,
	onModalClose,
	onTermSave }) => (
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
	    <Modal 
	    	onModalClose={ onModalClose }
	    	isModalVisible={ isModalVisible }
	    	onUserInput={ onUserInput }
	    	saveTerm={ saveTerm }
	    	onTermSave={ onTermSave } />
	  </div>
);

export default Home;