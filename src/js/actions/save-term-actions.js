export const ON_MODAL_VISIBILITY_CHANGE = 'ON_MODAL_VISIBILITY_CHANGE';

export function onModalVisibilityChange(visible) {
  return { type: ON_MODAL_VISIBILITY_CHANGE, visible };
}