export type MonitorUrlRequest = {
    url: string,
    label: string,
    frequency: number,
}

export type ActivityHistory = {
    active: boolean,
    date: string,
    info: string,
    responseTime: number
}

export class Url {
    appId: string;
    constructor(
        public uuid: string,
        public label: string,
        public url: string,
        public tags: string[],
        public active: boolean,
        public frequency: number,
        public activityHistory: ActivityHistory[]
    ) {
        this.appId = uuid.slice(0, 4) + this.label;
    };

    static fromJson(json: any): Url {
        return new Url(
            json.uuid,
            json.label,
            json.url,
            json.tags,
            json.active,
            json.frequency,
            json.activityHistory
        );
    }
}