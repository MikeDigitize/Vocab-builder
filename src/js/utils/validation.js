export function testWordLength(word, expectedLength) {
	return word.length >= expectedLength;
}

export function removeSpecialChars(word) {
	return word.replace(/[`~!@#$£%^&*()|+=?;:'"<>\{\}\[\]\\\/\d]/gi, '');
}