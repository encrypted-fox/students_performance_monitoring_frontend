import { ActionTree } from "vuex";
import axios from 'axios'
import { MenuState, Menu, Route } from "./types";
import { RootState } from "../types";
import Vue from 'vue'

export const actions: ActionTree<MenuState, RootState> = {
    getMenuRoutes({commit}): any {
        try {
            axios
            .get("/list_menu_categories/")
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    commit('GET_MENU_ROUTES', res.data);
                }
            })
            .catch((err) => {
                console.log(err)
                let errors = '';
                for (const key in err.response.data){
                    errors += err.response.data[key] + '\r\n'
                }
                Vue.$toast.error(errors);
            })
        } catch (err) {
            console.log(err)
        }
    },
    resetCurrentRoute({commit}) {
        commit('RESET_CURRENT_ROUTE')
    },
    setCurrentRoute({commit}, payload: Route) {
        commit('SET_CURRENT_ROUTE', payload);
    },
    setCurrentRouteByName({commit}, payload: Route) {
        commit('SET_CURRENT_ROUTE_BY_NAME', payload);
    },
}