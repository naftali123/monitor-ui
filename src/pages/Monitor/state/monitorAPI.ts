import { MonitorUrlRequest, Url } from "../types";

export class MonitorAPI {
  
  constructor(public monitorServer: string) {}

  async subscribe(url: MonitorUrlRequest): Promise<(Url | string)> {
    const response = await fetch(`${this.monitorServer}/monitor/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(url)
    });
    return (await response.json());
  }

  async subscribeList(urls: MonitorUrlRequest[]): Promise<(Url | string)[]> {
    const response = await fetch(`${this.monitorServer}/monitor/subscribe-list`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(urls)
    });
    return (await response.json())
      .map(
        (url: any) => typeof url === 'string' 
          ? url 
          : new Url(url.label, url.url, url.tags, url.active, url.frequency, url.activityHistory)
        );
  }

  //http://localhost:3000/monitor/urls/activity-history/snapshotNode
  async getActivityHistory(label: string) {
    const response = await fetch(`${this.monitorServer}/monitor/urls/activity-history/${label}`);
    return (await response.json());
  }

  async unsubscribeList(urls: MonitorUrlRequest[]) {}
}