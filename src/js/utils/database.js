import localforage from 'localforage';

class Database {
	set(key, value) {
		return localforage.setItem(key, value);
	}
	get(key) {
		return localforage.getItem(key);
	}
	remove(key) {
		return localforage.removeItem(key);
	}
	removeAll() {
		return this.keys().then(keys => {
			const removeItems = keys.map(key => this.remove(key));
			return Promise.all(removeItems);
		});
	}
	length() {
		return localforage.length();
	}
	keys() {
		return localforage.keys();
	}
	iterate(onSearch, onSuccess) {
		return localforage.iterate(onSearch, onSuccess);
	}
}

const VocabDatabase = new Database();
export default VocabDatabase;