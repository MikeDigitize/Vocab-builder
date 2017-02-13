export const ON_APP_DATA_LOADED = 'ON_APP_DATA_LOADED';

export function onAppDataLoaded(data) {
	return { type: ON_APP_DATA_LOADED, data };
}