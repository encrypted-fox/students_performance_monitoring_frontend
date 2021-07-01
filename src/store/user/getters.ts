import { GetterTree } from 'vuex'
import { UserState, User, Favorites } from './types'
import { RootState } from '../types'

export const getters: GetterTree<UserState, RootState> = {
    token(state): string | null {
        const { data } = state;
        console.log(state)
        return data?.access_token || null;
    },
    token_data(state): User {
        const { data } = state;
        return {
            access_token: data?.access_token || null,
            refresh_token: data?.refresh_token || null,
            expires_date: data?.expires_date || 0,
            token_type: data?.token_type || null
        }
    },

    favorites(state): Favorites[] | [] {
        const { data } = state;
        console.log(data)
        console.log(data?.settings)
        console.log(data?.settings?.favorites)
        return data?.settings?.favorites || []
    }
}