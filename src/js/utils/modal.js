import { testWordLength, removeSpecialChars } from './validation';
import Speech from '../utils/speech';

export function onEditWord({ edit, currentWord }, { onUserInput, saveTerm }) {
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
		if(testWordLength(text, 2) && text !== saveTerm) {
			onUserInput(text);
		}
		else {
			currentWord.textContent = saveTerm;
		}
	}
}

let preventSpeech = false;
export function onListen({ saveTerm }) {
	if(!preventSpeech) {
		preventSpeech = true;
		let talk = new Speech(saveTerm);
		talk.speech.onend = () => preventSpeech = false;
		talk.speak();
	}
}

export function onSave({ definition, synonyms }, { saveTerm, onTermSave }) {
	let definitionValue = definition.value.trim();
	let synonymsValue = synonyms.value;
	if(testWordLength(definitionValue, 5)) {
		if(synonymsValue) {
			synonymsValue = splitSynonymsToArray(synonymsValue);
		}
		else {
			synonyms = [];
		}
		let data = {};
		data[saveTerm] = {
			definition: definitionValue,
			synonyms: synonymsValue ? synonymsValue : []
		};
		definition.value = '';
		synonyms.value = '';
		onTermSave(data);		
	}
}

function splitSynonymsToArray(synonyms) {
	return synonyms.split(',').map(synonym => removeSpecialChars(synonym.trim()));
}

export function toggleModal({ modal, overlay }, { isModalVisible }) {
	function onTransitionEnd() {
		overlay.style.display = 'none';
		overlay.removeEventListener('transitionend', onTransitionEnd);
	}
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

export function onModalClose({ edit }, { saveTerm, onModalClose }, onEditWord) {
	if(edit.getAttribute('data-state') === 'save') {
		edit.textContent = saveTerm;
		onEditWord();
	}
	onModalClose();		
}