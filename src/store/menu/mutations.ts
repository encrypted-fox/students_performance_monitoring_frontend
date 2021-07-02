import Vue from 'vue';
import { MutationTree } from 'vuex'
import { MenuState, Menu, Route } from './types'

export const mutations: MutationTree<MenuState> = {
    GET_MENU_ROUTES(state: MenuState, payload: Route[]) {
        state['data'] = {
            ...state.data,
            routes: payload
        }
    },
    SET_CURRENT_ROUTE(state: MenuState, payload: Route) {
        state['data'] = {
            ...state.data,
            currentRoute: payload
        }
    },
    RESET_CURRENT_ROUTE(state: MenuState) {
        state['data'] = {
            ...state.data,
            currentRoute: {}
        }
    },
    SET_CURRENT_ROUTE_BY_NAME(state: MenuState, payload: string) {
        const { data } = state;
        const routes = data?.routes
        const currentRoute = routes?.filter((el: Route) => el.activity === payload)[0] || {id: 80, name: 'Ведомости', activity: `retrieve_student_records?id=${payload}`}

        state['data'] = {
            ...state.data,
            currentRoute: currentRoute
        }
    },
}