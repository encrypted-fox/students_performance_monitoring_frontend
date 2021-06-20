import { GetterTree } from 'vuex'
import { MenuState, Route } from './types'
import { RootState } from '../types'

export const getters: GetterTree<MenuState, RootState> = {
    menu_routes(state): Route[] | [] {
        const { data } = state;
        return data?.routes || [];
    },
    current_route(state): Route | null {
        const { data } = state;
        return data?.currentRoute || null
    }
}