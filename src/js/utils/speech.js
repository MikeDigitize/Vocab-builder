export default class Speech {
	constructor(text) {
		this.speech = new SpeechSynthesisUtterance(text);
	}
	speak() {
		window.speechSynthesis.speak(this.speech);
	}
}