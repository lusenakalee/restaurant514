import { configureStore } from '@reduxjs/toolkit'
import basketReducer from "@/lib/slices/basketSlice"
import { loadState, saveState } from './localStorageUtil';


const preloadedState = loadState();




export const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
  preloadedState: preloadedState ? { basket: preloadedState } : undefined,

});

store.subscribe(() => {
  saveState(store.getState().basket);
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch