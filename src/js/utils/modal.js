import { testWordLength, removeSpecialChars } from './validation';
import Speech from '../utils/speech';

export function onEditWord({ edit, currentWord }, { onUserInput, saveItem }) {

	let text = removeSpecialChars(currentWord.textContent);

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

let preventSpeech = false;

export function onListen({ saveItem }) {

	if(!preventSpeech) {
		preventSpeech = true;
		let talk = new Speech(saveItem);
		talk.speech.onend = () => preventSpeech = false;
		talk.speak();
	}

}

function removeErrorWarning(definition, errorMessage) {
	definition.classList.remove('modalError');
	errorMessage.classList.add('errorHide');
}

export function onSave({ definition, synonyms, errorMessage }, { saveItem, onItemSave }) {

	let definitionValue = definition.value.trim();

	if(!definitionValue.length) {
		definition.classList.add('modalError');
		errorMessage.classList.remove('errorHide');
		return;
	}

	if(definitionValue[definitionValue.length - 1] !== '.') {
		definitionValue += '.';
	}

	removeErrorWarning(definition, errorMessage);

	let synonymsValue = synonyms.value.trim();
	saveItem = saveItem.trim();

	if(testWordLength(definitionValue, 5)) {
		if(synonymsValue) {
			synonymsValue = splitSynonymsToArray(synonymsValue);
		}
		else {
			synonyms = [];
		}
		let data = {};
		data[saveItem] = {
			definition: definitionValue,
			synonyms: synonymsValue ? synonymsValue : []
		};
		definition.value = '';
		synonyms.value = '';
		onItemSave(data);		
	}

}

function splitSynonymsToArray(synonyms) {
	return synonyms.split(',').map(synonym => removeSpecialChars(synonym.trim()));
}

export function toggleModal({ modal, overlay, definition, errorMessage }, { isModalVisible }) {

	function onTransitionEnd() {
		overlay.style.display = 'none';
		overlay.removeEventListener('transitionend', onTransitionEnd);
	}

	removeErrorWarning(definition, errorMessage);

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

export function onModalClose({ edit }, { saveItem, onModalClose }, onEditWord) {
	if(edit.getAttribute('data-state') === 'save') {
		edit.textContent = saveItem;
		onEditWord();
	}
	onModalClose();		
}