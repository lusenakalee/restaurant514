// localStorageUtil.ts
import { BasketState } from './slices/basketSlice';

export const loadState = (): BasketState | undefined => {
  try {
    const serializedState = localStorage.getItem('basket');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState) as BasketState;
  } catch (err) {
    console.error('Could not load state', err);
    return undefined;
  }
};

export const saveState = (state: BasketState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('basket', serializedState);
  } catch (err) {
    console.error('Could not save state', err);
  }
};