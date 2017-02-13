export const ON_APP_DATA_LOADED = 'ON_APP_DATA_LOADED';

export function onAppDataLoaded(data) {
	return { type: ON_APP_DATA_LOADED, data };
}

export const ON_ITEM_SAVED = 'ON_ITEM_SAVED';

export function onItemSaved(savedItem) {
	return { type: ON_ITEM_SAVED, savedItem };
}