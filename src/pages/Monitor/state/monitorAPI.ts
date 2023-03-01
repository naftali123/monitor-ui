import axios from 'axios';
import { Url } from "../types/Url";
import { MonitorUrlRequest } from "../types/MonitorUrlRequest";

export class MonitorAPI {
  
  constructor(public monitorServer: string) {}

  async addUrl(url: MonitorUrlRequest): Promise<(Url | string | string[])> {
    try {
      const response = await axios({
        url: `${this.monitorServer}/monitor/url`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: url,
      });
      return (await response.data);
    } catch (error: any | unknown) {
      throw new Error(JSON.stringify(error.response.data.message));
      /// error.response.data.message || [];
      // return error.response.data.message || [];
    }
  }

  async addUrlList(urls: MonitorUrlRequest[]): Promise<(Url | string)[]> {
    const response = await axios(`${this.monitorServer}/monitor/url-list`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: urls
    });
    return (await response.data)
      .map(
        (url: any) => typeof url === 'string' 
          ? url 
          : new Url(url.uuid, url.label, url.url, url.tags, url.active, url.interval, url.threshold, url.activityHistory)
        );
  }

  //http://localhost:3000/monitor/urls/activity-history/snapshotNode
  async getActivityHistory(label: string) {
    const response = await axios.get(`${this.monitorServer}/monitor/urls/activity-history/${label}`);
    return (await response.data);
  }

  async remove(url: string) {
    const response = await axios({
      url: `${this.monitorServer}/monitor`,
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      data: {url},
    });
    return (await response.data);
  }

  async removeList(urls: string[]) {
    const response = await axios({
      url: `${this.monitorServer}/monitor/list`,
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      data: {urls},
    });
    return (await response.data);
  }

  async getAllUrls(): Promise<(Url | string)[]> {
    const limit = 20;
    const response = await axios.get(`${this.monitorServer}/monitor/all-urls/${limit}`);
    return (await response.data)
      .map(
        (url: any) => typeof url === 'string' 
          ? url 
          : new Url(url.uuid, url.label, url.url, url.tags, url.active, url.interval, url.threshold, url.activityHistory)
        );
  }
}