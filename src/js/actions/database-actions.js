import VocabDatabase from '../utils/database';
import { onModalVisibilityChange } from '../actions/save-item-actions';
import { onUserInput } from '../actions/global-actions';

export const ON_APP_DATA_LOADED = 'ON_APP_DATA_LOADED';

export function onAppDataLoaded(data) {
	return { type: ON_APP_DATA_LOADED, data };
}

export const ON_ITEM_SAVED = 'ON_ITEM_SAVED';

export function onItemSaved(savedItem) {
	return { type: ON_ITEM_SAVED, savedItem };
}

export function databaseDispatchers(dispatch) {
	return {
		onAppInitialise() {
      let lastSavedWord = '';
      VocabDatabase.iterate(function(data, word) {
        if(data.isLatestWord) {
          lastSavedWord = word;
        }
      })
      .then(() => VocabDatabase.keys())
      .then(function(keys) {
        const wordCount = keys.length;  
        dispatch(onAppDataLoaded({ wordCount, lastSavedWord }));          
      });
    },
    onItemSave(item) {
      let latestWord = Object.keys(item)[0];
      item[latestWord].isLatestWord = true;
      VocabDatabase.iterate(function(data, word) {
        if(data.isLatestWord) {
          data.isLatestWord = false;
          VocabDatabase.set(word, data);
        }
      })
      .then(() => VocabDatabase.set(latestWord, item[latestWord]))
      .then(function() {
        dispatch(onModalVisibilityChange(false));
        dispatch(onItemSaved(latestWord));
        dispatch(onUserInput(''));
      });
    }
	}
}