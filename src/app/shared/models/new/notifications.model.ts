import { ActionType } from "./data-table-actions";


export interface NotificationsData {
    notificationList: Array<NotificationList>;
}


export interface NotificationList {
    action?: ActionType.StatusEnum
    date: string,
    icon: string,
    intervals?: number,
    message?: string,
    notificationId: string
    read?: boolean,
    screen?: string,
    status?: NotificationStatus.TypeEnum,
    title: string,
}

export namespace NotificationStatus {
    export type TypeEnum = 'Success' | 'Failed' | 'In-Progress';
    export const TypeEnum = {
        SUCCES: 'Success' as TypeEnum,
        FAILED: 'Failed' as TypeEnum,
        IN_PROGRES: 'In-Progress' as TypeEnum,
    }
}
