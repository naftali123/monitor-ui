

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { io } from 'socket.io-client'
import { ActivityHistory } from '../types'
import { MONITOR_DOMAIN, MONITOR_DOMAIN_DEFAULT_PORT } from './config'

const domain: string = `${MONITOR_DOMAIN}:${MONITOR_DOMAIN_DEFAULT_PORT}`;

const limit: number = 20;

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: `http://${domain}/monitor/urls/`}),
    endpoints: (build) => ({
        getActivities: build.query<ActivityHistory[], string>({
            query: (label) => `activity-history/${label}/${limit}`,
            async onCacheEntryAdded(arg,{ updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
                const socket = io(`http://${domain}`, {transports: ["websocket"]}).connect();
                try {
                    // wait for the initial query to resolve before proceeding
                    const { data, meta } = await cacheDataLoaded
                    // console.log('cacheDataLoaded:', data, meta);
                    
                    socket.emit('subscribeToTags', 'oracle', (response: any) =>{
                        
                        console.log('Identity:', response);
                    });
                    
                    socket.on('activityHistory.updated', (message) => {
                        console.log('activityHistory.updated');
                        updateCachedData((draft) => { 
                            if(draft.length >= limit) draft.shift()
                            draft.push(message);
                        });
                    });

                    socket.on('connect', () => {
                        console.log(`socket.connected: ${socket.connected}`);
                        console.log('socket connected on rtk query');
                    });
                    socket.on('message', (message) => {
                        console.log(`received message: ${message}`);
                        // updateCachedData((draft) => { draft.push(message);});
                    });                    
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

export const { useGetActivitiesQuery } = api