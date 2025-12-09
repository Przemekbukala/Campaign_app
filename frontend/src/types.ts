export enum CampaignStatus {
    ON = 'ON',
    OFF = 'OFF'
}

export interface Campaign {
    id?: number;
    name: string;
    keywords: string[];
    bidAmount: number;
    campaignFund: number;
    status: CampaignStatus;
    town: string;
    radius: number;
}