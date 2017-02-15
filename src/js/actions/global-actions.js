export const ON_MODE_CHANGE = 'ON_MODE_CHANGE';

export function onModeChange(mode) {
  return { type: ON_MODE_CHANGE, mode };
}

export const ON_USER_INPUT = 'ON_USER_INPUT';

export function onUserInput(value) {
	return { type : ON_USER_INPUT, value };
}

export const ON_MODAL_VISIBILITY_CHANGE = 'ON_MODAL_VISIBILITY_CHANGE';

export function onModalVisibilityChange(isVisible) {
  return { type: ON_MODAL_VISIBILITY_CHANGE, isVisible };
}