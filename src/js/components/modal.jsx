import React, { PropTypes, Component } from 'react';
import { testWordLength, removeSpecialChars } from '../utils/validation';
import { onListen } from '../utils/speech';
import styles from '../../scss/modal';

export default class Modal extends Component {

	constructor(props) {
		super(props);
	}

	componentDidUpdate() {
		this.toggleModal();
	}

	toggleModal() {

		const { modal, overlay, definition, errorMessage } = this.refs;
		const { isModalVisible } = this.props;

		function onTransitionEnd() {
			overlay.style.display = 'none';
			overlay.removeEventListener('transitionend', onTransitionEnd);
		}

		definition.classList.remove('modalError');
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
		const { onModalClose, saveItem } = this.props;

		if(edit.getAttribute('data-state') === 'save') {
			edit.textContent = saveItem;
			this.onEditWord();
		}
		onModalClose();		

	}

	onSave() {

		const { definition, synonyms, errorMessage } = this.refs;
		const { saveItem, onItemSave } = this.props;

		let definitionValue = definition.value.trim();
		let synonymsValue = synonyms.value.trim();
		let saveItemValue = saveItem.trim();

		if(!definitionValue.length) {
			definition.classList.add('modalError');
			errorMessage.classList.remove('errorHide');
			return;
		}

		definition.classList.remove('modalError');
		errorMessage.classList.add('errorHide');

		definition.value = '';
		synonyms.value = '';

		if(definitionValue[definitionValue.length - 1] !== '.') {
			definitionValue += '.';
		}

		if(synonymsValue) {
			synonymsValue = synonymsValue.split(',').map(synonym => removeSpecialChars(synonym.trim()));
		}
		else {
			synonymsValue = [];
		}

		if(testWordLength(definitionValue, 5)) {
			
			let data = {};
			data[saveItemValue] = {
				definition: definitionValue,
				synonyms: synonymsValue
			};
			
			onItemSave(data);	

		}

	}

	render() {

		const { onModalClose, saveItem } = this.props;
		return (
		  <div className={ `${styles.modalHolder}` }>
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
									ref="definition" 
									rows="3"
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
										ref="synonyms" 
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
								Save { saveItem }
							</button>
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
  onItemSave: PropTypes.func.isRequired
};