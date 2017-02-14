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
		const { 
			onChangeMode, 
			mode, 
			onUserInput, 
			saveItem, 
			searchItem, 
			onSubmitItem,
			isModalVisible,
			onModalClose,
			onItemSave,
			isAppDataLoaded,
			wordCount,
			lastSavedWord,
			searchResults,
			isSearching,
			onSearch } = this.props;

		if(isAppDataLoaded) {
			return (
				<div className="col-xl-6 offset-xl-3">
			    <ModeControl onChangeMode={ onChangeMode } />
			    <TextInput 
			    	mode={ mode } 
			    	onUserInput={ onUserInput } 
			    	saveItem={ saveItem } 
			    	searchItem={ searchItem } 
			    	onSubmitItem={ onSubmitItem }
			    	onSearch={ onSearch }
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
						onItemSave={ onItemSave } />
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
  onSubmitItem: PropTypes.func.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
	onItemSave: PropTypes.func.isRequired,
  isAppDataLoaded: PropTypes.bool.isRequired,
  wordCount: PropTypes.number.isRequired,
  lastSavedWord: PropTypes.string.isRequired,
  searchResults: PropTypes.array.isRequired,
  isSearching: PropTypes.bool.isRequired,
  onSearch: PropTypes.func.isRequired
};