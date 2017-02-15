class Speech {
	constructor(text) {
		this.speech = new SpeechSynthesisUtterance(text);
	}
	speak() {
		window.speechSynthesis.speak(this.speech);
	}
}

let preventSpeech = false;

export function onListen(saveItem) {
	if(!preventSpeech) {
		preventSpeech = true;
		let talk = new Speech(saveItem);
		talk.speech.onend = () => preventSpeech = false;
		talk.speak();
	}
}
