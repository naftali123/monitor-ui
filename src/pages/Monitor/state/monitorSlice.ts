import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import { Url } from "../types/Url";
import { MonitorUrlRequest } from "../types/MonitorUrlRequest";
import { MonitorAPI } from './monitorAPI';

export interface MonitorState {
  urls: Url[];
  status: 'idle' | 'loading' | 'success' | 'failed' | 'unavailable';
  serverErrorMessages: string[];
}

const initialState: MonitorState = {
  urls: [],
  status: 'idle',
  serverErrorMessages: [],
};

export const monitorAPI = new MonitorAPI();

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
  reducers: {
    unavailable: (state) => {
      state.status = 'unavailable';
    },
    clearServerErrorMessages: (state) => {
      state.serverErrorMessages = [];
    },
    activitiesUpdated: (state, action) => {
      const url = state.urls.find((url) => url.label === action.payload.label);
      if (url) {
        url.activityHistory.push(action.payload);
        if (url.activityHistory.length > 20) {
          url.activityHistory.shift();
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // getAllUrls
      .addCase(getAllUrls.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllUrls.fulfilled, (state, action) => {
        state.status = 'success';
        if (Array.isArray(action.payload)) {
          state.urls = (action.payload as Url[]).map((url) => Url.fromJson(url));
        }
        else {
          console.error('Error getAllUrls: ', action.payload);
        }
      })
      .addCase(getAllUrls.rejected, (state, action) => {
        state.status = 'failed';
        // state.serverErrorMessages = [...state.serverErrorMessages, ...action.payload];
      })

      // addUrl
      .addCase(addUrl.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addUrl.fulfilled, (state, action) => {
        state.status = 'success';
        if (typeof action.payload !== 'string') {
          state.urls.push(Url.fromJson(action.payload));
        }
        else {
          console.error('Error subscribing: ', action.payload);
        }
      })
      .addCase(addUrl.rejected, (state, action) => {
        state.status = 'failed';
        state.serverErrorMessages = JSON.parse(action.error.message ?? '[]') ?? [];
      })
      // addUrlList
      .addCase(addUrlList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addUrlList.fulfilled, (state, action) => {
        state.status = 'success';
        if (Array.isArray(action.payload)) {
          state.urls = (action.payload as Url[]).filter((url) => typeof url !== 'string');
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
          const url = state.urls.find((url) => url.label === action.meta.arg);
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
        state.urls = state.urls.filter((url) => url.url !== action.payload);
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
          state.urls = state.urls.filter((url) => !(action.payload as string[]).includes(url.label));
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
