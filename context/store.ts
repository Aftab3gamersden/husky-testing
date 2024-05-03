import imageReducer from './loginFeatures/imageSlice';
import loginReducer from './loginFeatures/loginSlice';
import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { GetExploreApi } from './exploreContext/ExploreContext'
import { setupListeners } from '@reduxjs/toolkit/query';
import activeid from './exploreContext/activeid'
import Userid from './exploreContext/Userid';
import StoreUUId from './exploreContext/StoreUUId';
export const store = configureStore({
  reducer: {
    login: loginReducer,
    activeid: activeid,
    userid: Userid,
    UUID: StoreUUId,
    image:imageReducer,
    [GetExploreApi.reducerPath]: GetExploreApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false, // Disable immutable state invariant middleware
    }).concat(GetExploreApi.middleware),
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch