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

export const ON_EDIT_TOGGLE = 'ON_EDIT_TOGGLE';

export function onEditToggle(isEditMode) {
  return { type: ON_EDIT_TOGGLE, isEditMode };
}

export const ON_SAVE_ITEM_DATA = 'ON_SAVE_ITEM_DATA';

export function onSaveItemData(data) {
  return { type: ON_SAVE_ITEM_DATA, data };
}