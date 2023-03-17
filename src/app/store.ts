import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import monitorReducer from '../pages/Monitor/state/monitorSlice';
import userReducer from '../pages/SignUp/state/userSlice';
import { activityHistoryApi } from '../pages/Monitor/state/websocket';

export const store = configureStore({
  reducer: {
    userReducer: userReducer,
    monitorReducer: monitorReducer,
    [activityHistoryApi.reducerPath]: activityHistoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({  
    serializableCheck: false
  }).concat([activityHistoryApi.middleware]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
