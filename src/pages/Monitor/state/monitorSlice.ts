import { 
  createAsyncThunk, 
  createSlice, 
  // PayloadAction 
} from '@reduxjs/toolkit';
import { 
  // RootState 
} from '../../../app/store';
import { 
  MonitorUrlRequest,
  Url 
} from '../types';
import { MonitorAPI } from './monitorAPI';

export interface CounterState {
  subscriptions: Url[];
  status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: CounterState = {
  subscriptions: [],
  status: 'idle',
};

export const monitorAPI = new MonitorAPI('http://localhost:3000');

export const subscribe = createAsyncThunk(
  'monitor/subscribe',
  async (url: MonitorUrlRequest) => {
    const response = await monitorAPI.subscribe(url);
    return response;
  }
);

export const subscribeList = createAsyncThunk(
  'monitor/subscribeList',
  async (urls: MonitorUrlRequest[]) => {
    const response = await monitorAPI.subscribeList(urls);
    return response;
  }
);

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // subscribe
      .addCase(subscribe.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(subscribe.fulfilled, (state, action) => {
        state.status = 'idle';
        if (typeof action.payload !== 'string') {
          state.subscriptions.push(action.payload as Url);
        }
        else {
          console.error('Error subscribing: ', action.payload);
        }
      })
      .addCase(subscribe.rejected, (state) => {
        state.status = 'failed';
      })
      // subscribeList
      .addCase(subscribeList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(subscribeList.fulfilled, (state, action) => {
        state.status = 'idle';
        if (Array.isArray(action.payload)) {
          state.subscriptions = (action.payload as Url[]).filter((url) => typeof url !== 'string');
          console.log('Already subscribed: ', (action.payload as string[]).filter((url) => typeof url === 'string'));
        }
        else {
          console.error('Error subscribing: ', action.payload);
        }
      })
      .addCase(subscribeList.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default counterSlice.reducer;
