

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { io } from 'socket.io-client'
import { ActivityHistory } from "../types/ActivityHistory";
import { HOST, DEFAULT_PORT, WEB_SOCKET_PORT, API_URL } from './config'

const limit: number = 20;

const socket = io(`http://${HOST}:${WEB_SOCKET_PORT}${API_URL}`, {transports: ["websocket"]}).connect();

export const activityHistoryApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: `http://${HOST}:${DEFAULT_PORT}${API_URL}/monitor/urls/`}),
    endpoints: (build) => ({
        getActivities: build.query<ActivityHistory[], string>({
            query: (label) => `activity-history/${label}/${limit}`,
            async onCacheEntryAdded(arg,{ updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }) {
                try {
                    await cacheDataLoaded
                    socket.on(`activityHistory.${arg}.updated`, (message) => {
                        updateCachedData((draft) => {
                            message.label = arg;
                            if(draft.length >= limit) draft.shift()
                            draft.push(message);
                            dispatch({type: 'monitor/activitiesUpdated', payload: message});
                        });
                    });
                    socket.on('connect', () => console.log('socket connected on rtk query'));
                } catch(e: any | unknown) {
                    console.error(e);
                    // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`, in which case `cacheDataLoaded` will throw
                }
                // cacheEntryRemoved will resolve when the cache subscription is no longer active
                await cacheEntryRemoved
                // perform cleanup steps once the `cacheEntryRemoved` promise resolves
                socket.close();
            },
        }),
    }),
})

export const { useGetActivitiesQuery } = activityHistoryApi;