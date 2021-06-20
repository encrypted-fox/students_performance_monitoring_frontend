export interface Route {
    id?: number,
    name?: string,
    activity?: string
}

export interface Menu {
    routes?: Route[],
    currentRoute?: Route
}

export interface MenuState {
    data?: Menu,
}