export const ON_MODE_CHANGE = 'ON_MODE_CHANGE';

export function onModeChange(mode) {
  return { type: ON_MODE_CHANGE, mode };
}