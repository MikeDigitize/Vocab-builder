import React, { PropTypes, Component } from 'react';
import { testWordLength, removeSpecialChars } from '../../utils/validation';
import { onListen } from '../../utils/speech';
import styles from '../../../scss/modal';

export default class Modal extends Component {

	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(nextProps) {
		
		const { definitionInput } = this.refs;
		if(!this.props.isModalVisible && nextProps.isModalVisible) {
			window.requestAnimationFrame(() => definitionInput.focus());			
		}
		
	}

	componentDidUpdate() {

		const { isModalVisible } = this.props;
		const { modal } = this.refs;

		this.toggleModal();

		if(isModalVisible) {
			modal.parentNode.setAttribute('aria-hidden', false);
			document.body.firstElementChild.setAttribute('aria-hidden', true);
		}
		else {
			modal.parentNode.setAttribute('aria-hidden', true);
			document.body.firstElementChild.setAttribute('aria-hidden', false);
		}

	}

	toggleModal() {

		const { modal, overlay, definitionInput, errorMessage } = this.refs;
		const { isModalVisible } = this.props;

		function onTransitionEnd() {
			overlay.style.display = 'none';
			overlay.removeEventListener('transitionend', onTransitionEnd);
		}

		definitionInput.classList.remove('modalError');
		errorMessage.classList.add('errorHide');

		if(isModalVisible) {
			overlay.style.display = 'block';
			overlay.classList.add('active');
			modal.classList.add('active');
		}
		else {
			overlay.addEventListener('transitionend', onTransitionEnd);
			overlay.classList.remove('active');
			modal.classList.remove('active');
		}
		
	}

	onEditWord() {

		const { edit, currentWord } = this.refs;
		const { onUserInput, saveItem } = this.props;
		const text = removeSpecialChars(currentWord.textContent);

		if(edit.getAttribute('data-state') === 'edit') {
			edit.setAttribute('data-state', 'save');
			edit.textContent = 'save changes';
			currentWord.contentEditable = 'true';
			currentWord.focus();
		}
		else {
			edit.setAttribute('data-state', 'edit');
			edit.textContent = 'edit';
			currentWord.contentEditable = 'false';
			if(testWordLength(text, 2) && text !== saveItem) {
				onUserInput(text);
			}
			else {
				currentWord.textContent = saveItem;
			}

		}	
	}

	onListen() {

		const { saveItem } = this.props;
		onListen(saveItem);		

	}

	onModalClose() {

		const { edit } = this.refs;
		const { onModalClose, saveItem, onEditToggle, isEditMode } = this.props;

		if(edit.getAttribute('data-state') === 'save') {
			edit.textContent = saveItem;
			this.onEditWord();
		}

		if(isEditMode) {
			onEditToggle({ isEditMode: false });
		}
		else {
			onModalClose();		
		}		

	}

	onSaveItemData() {

		const { definitionInput, synonymsInput, errorMessage } = this.refs;
		const { onSaveItemData } = this.props;
		const definition = definitionInput.value;
		const synonyms = synonymsInput.value;
		
		definitionInput.classList.remove('modalError');
		errorMessage.classList.add('errorHide');
		onSaveItemData({ definition, synonyms	});

	}

	onDelete() {

		const { onDelete, saveItem, onEditToggle } = this.props;
		const proceed = confirm(`Are you sure you want to delete ${saveItem}?`);
		if(proceed) {
			onDelete({ saveItem, onEditToggle });
		}		

	}

	onSave() {

		const { definitionInput, synonymsInput, errorMessage } = this.refs;
		const { saveItem, onItemSave, saveItemData, isEditMode, searchItem } = this.props;
		let { definition, synonyms } = saveItemData;

		if(!definition.length) {
			definitionInput.classList.add('modalError');
			errorMessage.classList.remove('errorHide');
			return;
		}

		definitionInput.classList.remove('modalError');
		errorMessage.classList.add('errorHide');

		definitionInput.value = '';
		synonymsInput.value = '';

		if(definition[definition.length - 1] !== '.') {
			definition += '.';
		}

		if(synonyms.length) {
			synonyms = synonyms
											.split(',')
											.map(synonym => removeSpecialChars(synonym.trim()));
		}
		else {
			synonyms = [];
		}

		if(testWordLength(definition, 5)) {
			
			let item = {};
			item[saveItem] = {
				definition,
				synonyms
			};
			
			onItemSave({ item, isEditMode, searchItem });	

		}

	}

	render() {

		const { onModalClose, saveItem, isEditMode, saveItemData } = this.props;
		return (
		  <div className={ `${styles.modalHolder}` } aria-hidden="true">
				<div className="vocabModal" ref="modal">	 	
					<div className="modal-close" onClick={ this.onModalClose.bind(this) }></div>	
					<div className="row">
						<div className="col-sm-12">
							<h2> 
								<span ref="currentWord">{ saveItem }</span>
								<p
									data-state="edit"
									ref="edit"
									onClick={ this.onEditWord.bind(this) } 
									className={ `${styles.editWord}` }>
									edit
								</p>
							</h2>
							<span className="listen" onClick={ this.onListen.bind(this) }>Listen</span>
						</div>
						<div className="col-sm-8 offset-sm-2">
							<div className="form-group">
								<label htmlFor="definition">Add a definition</label>
								<textarea 
									className="form-control" 
									id="definition" 
									ref="definitionInput" 
									rows="3"
									value={ saveItemData.definition }
									onChange={ this.onSaveItemData.bind(this) }
									aria-describedby="definitionHelp" 
									placeholder={ `Define ${saveItem}...` }>
								</textarea>
								<small 
									ref="errorMessage" 
									className="modalError errorHide">
									Make sure you add a definition before you save!
								</small>
								<small 
									id="definitionHelp" 
									className="form-text text-muted">
									Add a definition to store alongside your word.
								</small> 
							</div>
						</div>
						<div className="col-sm-8 offset-sm-2">
							<div className="form-group">
								<label htmlFor="synonyms">Synonyms</label>
									<input 
										type="text" 
										className="form-control" 
										id="synonyms"
										ref="synonymsInput"
										value={ saveItemData.synonyms } 
										onChange={ this.onSaveItemData.bind(this) }
    								aria-describedby="synonymHelp"
    								placeholder={ `Synonyms for ${saveItem}...` }/>
									<small 
										id="synonymHelp" 
										className="form-text text-muted">
										Synonyms are optional! Use commas to separate words or phrases.
									</small> 
							</div>
							<button 
								type="submit" 
								className="btn btn-primary"
								onClick={ this.onSave.bind(this) }>
								Save { saveItem.length > 13 ? `${saveItem.substr(0, 10)}...` : saveItem }
							</button>
							{ isEditMode && 
								<button 
									type="submit" 
									className="btn btn-danger"
									onClick={ this.onDelete.bind(this) }>
									Delete { saveItem.length > 13 ? `${saveItem.substr(0, 10)}...` : saveItem }
								</button>
							}
						</div>
					</div>
				</div>	
				<div 
					className="modalOverlay"
					ref="overlay"
					onClick={ this.onModalClose.bind(this) } >						
				</div>	 
			</div>
		);

	}
	
}

Modal.propTypes = {
  onModalClose: PropTypes.func.isRequired,
	onItemSave: PropTypes.func.isRequired,
	isModalVisible: PropTypes.bool.isRequired,
  saveItem: PropTypes.string.isRequired,
  onUserInput: PropTypes.func.isRequired,
  onItemSave: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  onSaveItemData: PropTypes.func.isRequired,
  saveItemData: PropTypes.shape({
  	definition: PropTypes.string.isRequired,
  	synonyms: PropTypes.string.isRequired
  }).isRequired,
  onEditToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  searchItem: PropTypes.string.isRequired
};