export interface Favorites {
    id: number,
    name: string,
    activity: string,
    count?: number
}

export interface Settings {
    favorites: Favorites[] | []
}

export interface User {
    access_token?: string | null,
    refresh_token?: string | null,
    settings?: Settings,
    expires_in?: number,
    expires_date?: number,
    token_type?: string | null,
}

export interface UserState {
    data?: User
}