import { ActivityHistory } from "./ActivityHistory";

export class Url {
    appId: string;
    constructor(
        public uuid: string,
        public label: string,
        public url: string,
        public tags: string[],
        public active: boolean,
        public interval: number,
        public threshold: number,
        public activityHistory: ActivityHistory[]
    ) {
        this.appId = uuid.slice(0, 4) + this.label.trim().replaceAll(' ', '-').toLowerCase();
    };

    static fromJson(json: any): Url {
        return new Url(
            json.uuid,
            json.label,
            json.url,
            json.tags,
            json.active,
            json.interval,
            json.threshold,
            json.activityHistory
        );
    }
}
