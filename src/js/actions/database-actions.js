export const ON_APP_DATA_LOADED = 'ON_APP_DATA_LOADED';

export function onAppDataLoaded(data) {
	return { type: ON_APP_DATA_LOADED, data };
}

export const ON_ITEM_SAVED = 'ON_ITEM_SAVED';

export function onItemSaved(data) {
	return { type: ON_ITEM_SAVED, data };
}

export const ON_SEARCH_RESULTS = 'ON_SEARCH_RESULTS';

export function onSearchResults(data) {
	return { type: ON_SEARCH_RESULTS, data };
}

export const ON_DELETE = 'ON_DELETE';

export function onDelete(data) {
	return { type: ON_DELETE, data };
}