export const ON_GAME_DATA_LOADED = 'ON_GAME_DATA_LOADED';

export function onAppDataLoaded(data) {
	return { type: ON_GAME_DATA_LOADED, data };
}
