export interface UserDataList {
    users: Array<UserInfo>;
}
export interface UserInfo {
    name: string,
    key: string,
    role: UserRoleEnum
}

export enum UserRoleEnum {
    ADMIN = 'admin',
    USER = 'user'
}