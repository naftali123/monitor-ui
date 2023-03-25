import axios from 'axios';
import { Url } from "../types/Url";
import { MonitorUrlRequest } from "../types/MonitorUrlRequest";
import { API, DEFAULT_PORT, API_URL, HOST } from './config';
import { HEADERS as headers } from './config';

export class MonitorAPI {
  
  constructor(
    public host: string = `http://${HOST}:${DEFAULT_PORT}${API_URL}`,
  ) {}

  async addUrl(data: MonitorUrlRequest): Promise<(Url | string | string[])> {
    const url = `${this.host}${API.MONITOR.ADD_URL}`;
    const method = 'POST';
    try {
      const response = await axios({ url, method, headers, data });
      return (await response.data);
    } catch (error: any | unknown) {
      console.error(`error at addUrl: ${url}`, error);
      throw new Error(JSON.stringify(error.response.data.message));
    }
  }

  async addUrlList(data: MonitorUrlRequest[]): Promise<(Url | string)[]> {
    const url: string = `${this.host}${API.MONITOR.ADD_URL_LIST}`;
    const method = 'POST';
    const response = await axios({ url, method, headers, data });
    return (await response.data)
      .map(
        (url: any) => typeof url === 'string' 
          ? url 
          : new Url(url.uuid, url.label, url.url, url.tags, url.active, url.interval, url.threshold, url.activityHistory)
        );
  }

  async getActivityHistory(label: string) {
    const url = `${this.host}${API.MONITOR.GET_ACTIVITY_HISTORY.replace(':label', label)}`;
    const method = 'GET';
    const response = await axios({ url, method, headers });
    return (await response.data);
  }

  async remove(data: string) {
    const url = `${this.host}${API.MONITOR.REMOVE_URL}`;
    const method = 'DELETE';
    const response = await axios({ url, method, headers, data: {url: data}});
    return (await response.data);
  }

  async removeList(urls: string[]) {
    const url = `${this.host}${API.MONITOR.REMOVE_URL_LIST}`;
    const method = 'DELETE';
    const response = await axios({ url, method, headers, data: {urls}});
    return (await response.data);
  }

  async getAllUrls(): Promise<(Url | string)[]> {
    const limit = 20;
    const url = `${this.host}${API.MONITOR.GET_ALL_URLS.replace(':limit', limit.toString())}`;
    const method = 'GET';
    const response = await axios({ url, method, headers });
    return (await response.data)
      .map(
        (url: any) => typeof url === 'string' 
          ? url 
          : new Url(url.uuid, url.label, url.url, url.tags, url.active, url.interval, url.threshold, url.activityHistory)
        );
  }
}