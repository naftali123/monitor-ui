export type MonitorUrlRequest = {
    url: string,
    label: string,
    frequency: number,
}

export type ActivityHistory = {
    active: boolean,
    date: string,
    info: string,
}

export class Url {
    constructor(
        public label: string,
        public url: string,
        public tags: string[],
        public active: boolean,
        public frequency: number,
        public activityHistory: ActivityHistory[]
    ) {};
}