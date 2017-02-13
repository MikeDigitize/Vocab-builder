import React, { Component, PropTypes } from 'react';
import ModeControl from './mode-control';
import TextInput from './text-input';
import Results from './results';
import Modal from './modal';

export default class Home extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.props.onAppInitialise();
	}
	render() {
		let { 
			onChangeMode, 
			mode, 
			onUserInput, 
			saveItem, 
			searchItem, 
			onSubmitWord,
			isModalVisible,
			onModalClose,
			onTermSave,
			isAppDataLoaded,
			wordCount,
			lastSavedWord,
			searchResults,
			isSearching } = this.props;

		if(isAppDataLoaded) {
			return (
				<div className="col-xl-6 offset-xl-3">
			    <ModeControl onChangeMode={ onChangeMode } />
			    <TextInput 
			    	mode={ mode } 
			    	onUserInput={ onUserInput } 
			    	saveItem={ saveItem } 
			    	searchItem={ searchItem } 
			    	onSubmitWord={ onSubmitWord }
			    />
			    <Results 
			    	wordCount={ wordCount }
			    	lastSavedWord={ lastSavedWord }
			    	mode={ mode }
			    	searchResults={ searchResults }
			    	isSearching={ isSearching }
			    />
			    <Modal 
			    	onModalClose={ onModalClose }
			    	isModalVisible={ isModalVisible }
			    	onUserInput={ onUserInput }
			    	saveItem={ saveItem }
			    	onTermSave={ onTermSave } />
			  </div>
			);
		}
		return false;
	}
}


Home.propTypes = {
  onChangeMode: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
	onUserInput: PropTypes.func.isRequired,
  saveItem: PropTypes.string.isRequired,
  searchItem: PropTypes.string.isRequired,
  onSubmitWord: PropTypes.func.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onTermSave: PropTypes.func.isRequired,
  isAppDataLoaded: PropTypes.bool.isRequired,
  wordCount: PropTypes.number.isRequired,
  lastSavedWord: PropTypes.string.isRequired,
  searchResults: PropTypes.array.isRequired,
  isSearching: PropTypes.bool.isRequired
};