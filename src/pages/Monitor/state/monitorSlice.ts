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
import { MONITOR_DOMAIN, MONITOR_DOMAIN_DEFAULT_PORT } from './config';
import { MonitorAPI } from './monitorAPI';

export interface CounterState {
  subscriptions: Url[];
  status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: CounterState = {
  subscriptions: [],
  status: 'idle',
};

export const monitorAPI = new MonitorAPI(`http://${MONITOR_DOMAIN}:${MONITOR_DOMAIN_DEFAULT_PORT}`);

export const getAllUrls = createAsyncThunk(
  'monitor/all-urls',
  async () => {
    const response = await monitorAPI.getAllUrls();
    return response;
  }
);

export const addUrl = createAsyncThunk(
  'monitor/add-url',
  async (url: MonitorUrlRequest) => {
    const response = await monitorAPI.addUrl(url);
    return response;
  }
);

export const addUrlList = createAsyncThunk(
  'monitor/url-list',
  async (urls: MonitorUrlRequest[]) => {
    const response = await monitorAPI.addUrlList(urls);
    return response;
  }
);

export const remove = createAsyncThunk(
  'monitor/remove',
  async (url: string) => {
    const response = await monitorAPI.remove(url);
    return response;
  }
);

export const removeList = createAsyncThunk(
  'monitor/remove-list',
  async (urls: string[]) => {
    const response = await monitorAPI.removeList(urls);
    return response;
  }
);


export const getActivityHistory = createAsyncThunk(
  'monitor/activity-history',
  async (label: string) => {
    const response = await monitorAPI.getActivityHistory(label);
    return response;
  }
);

export const monitorSlice = createSlice({
  name: 'monitor',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getAllUrls
      .addCase(getAllUrls.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllUrls.fulfilled, (state, action) => {
        state.status = 'success';
        if (Array.isArray(action.payload)) {
          state.subscriptions = (action.payload as Url[]).map((url) => Url.fromJson(url));
        }
        else {
          console.error('Error getAllUrls: ', action.payload);
        }
      })
      .addCase(getAllUrls.rejected, (state) => {
        state.status = 'failed';
      })
      
      // addUrl
      .addCase(addUrl.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addUrl.fulfilled, (state, action) => {
        state.status = 'success';
        if (typeof action.payload !== 'string') {
          state.subscriptions.push(Url.fromJson(action.payload));
        }
        else {
          console.error('Error subscribing: ', action.payload);
        }
      })
      .addCase(addUrl.rejected, (state) => {
        state.status = 'failed';
      })
      // addUrlList
      .addCase(addUrlList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addUrlList.fulfilled, (state, action) => {
        state.status = 'success';
        if (Array.isArray(action.payload)) {
          state.subscriptions = (action.payload as Url[]).filter((url) => typeof url !== 'string');
          console.log('Already addUrl: ', (action.payload as string[]).filter((url) => typeof url === 'string'));
        }
        else {
          console.error('Error subscribing: ', action.payload);
        }
      })
      .addCase(addUrlList.rejected, (state) => {
        state.status = 'failed';
      })
      // getActivityHistory
      .addCase(getActivityHistory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getActivityHistory.fulfilled, (state, action) => {
        state.status = 'success';
        if (Array.isArray(action.payload)) {
          const url = state.subscriptions.find((url) => url.label === action.meta.arg);
          if (url) {
            url.activityHistory = action.payload;
          }
        }
        else {
          console.error('Error getting activity history: ', action.payload);
        }
      })  
      .addCase(getActivityHistory.rejected, (state) => {
        state.status = 'failed';
      })
      // remove
      .addCase(remove.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(remove.fulfilled, (state, action) => {
        state.status = 'success';
        state.subscriptions = state.subscriptions.filter((url) => url.url !== action.payload);
      })
      .addCase(remove.rejected, (state) => {
        state.status = 'failed';
      })
      // removeList
      .addCase(removeList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeList.fulfilled, (state, action) => {
        state.status = 'success';
        if (Array.isArray(action.payload)) {
          state.subscriptions = state.subscriptions.filter((url) => !(action.payload as string[]).includes(url.label));
          console.log('Already removed: ', (action.payload as string[]).filter((url) => typeof url === 'string'));
        }
        else {
          console.error('Error unsubscribing: ', action.payload);
        }
      })
      .addCase(removeList.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default monitorSlice.reducer;
