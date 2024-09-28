export interface UserDataList {
    users: Array<UserList>;
}
export interface UserList {
    name: string,
    key: string,
    role: UserRoleEnum
}

export enum UserRoleEnum {
    ADMIN = 'admin',
    USER = 'user'
}