export const ON_MODE_CHANGE = 'ON_MODE_CHANGE';

export function onModeChange(mode) {
  return { type: ON_MODE_CHANGE, mode };
}

export const ON_USER_INPUT = 'ON_USER_INPUT';

export function onUserInput(value) {
	return { type : ON_USER_INPUT, value };
}