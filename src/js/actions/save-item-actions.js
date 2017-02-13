export const ON_MODAL_VISIBILITY_CHANGE = 'ON_MODAL_VISIBILITY_CHANGE';

export function onModalVisibilityChange(isVisible) {
  return { type: ON_MODAL_VISIBILITY_CHANGE, isVisible };
}

export function saveItemDispatchers(dispatch) {
	return {
		onSubmitItem() {
      dispatch(onModalVisibilityChange(true));
    },
    onModalClose() {
      dispatch(onModalVisibilityChange(false));
    }
	}
}