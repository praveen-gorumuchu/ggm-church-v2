export interface RouteDataModel {
    header?: HeaderRouteModel,
    body?: BodyRouteModel
}

export interface HeaderRouteModel {
    theme?: ThemeEnumModel,
    isHeader?: boolean,
    transition?: boolean,
    hideGlobalNav?: boolean,
    headerTitle?: boolean,
    menuIcon?: boolean
}

export interface BodyRouteModel {
    theme?: ThemeEnumModel,
    marnoMarginin?: boolean
}

export enum ThemeEnumModel {
    DARK = 'dark',
    LIGHT = 'light',
    TRANSPERANT = 'transperant',
    DARK_HEADER = 'dark-header',
    LIGHT_HEADER = 'light-header'

}