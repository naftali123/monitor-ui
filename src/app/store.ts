import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import monitorReducer from '../pages/Monitor/state/monitorSlice';
import { api } from '../pages/Monitor/state/websocket';

export const store = configureStore({
  reducer: {
    monitor: monitorReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({  
    serializableCheck: false
  }).concat([api.middleware]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
