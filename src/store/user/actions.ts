import { ActionTree } from "vuex";
import axios, { AxiosPromise } from 'axios'
import { UserState, User, Favorites } from "./types";
import { RootState } from "../types";
import Vue from 'vue'
import localforage from "localforage";

/* eslint-disable */

localforage.config({
    driver      : localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
    name        : 'myApp',
    version     : 1.0,
    storeName   : 'username', // Should be alphanumeric, with underscores.
    description : 'username' 
});

export const actions: ActionTree<UserState, RootState> = {
    registerUser({commit}, payload): any {
        try {
            axios
            .post("/auth/register/", JSON.stringify(payload))
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    commit('REGISTER_USER', res.data);
                    Vue.$toast.success('Регистрация прошла успешно!');
                    Vue.prototype.$http.defaults.headers.common.Authorization = `${res.data.token_type} ${res.data.access_token}`;
                }
            })
            .catch((err) => {
                console.log(err)
                let errors = '';
                for (const key in err.response.data){
                    errors += err.response.data[key][0] + '\r\n'
                }
                Vue.$toast.error(errors);
            })
        } catch (err) {
            console.log(err)
        }
    },

    authUser({commit}, payload): any {
        try {
            axios
            .post("/auth/token/", JSON.stringify(payload))
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    commit('AUTH_USER', res.data);
                    Vue.$toast.success('Авторизация прошла успешно!');
                    Vue.prototype.$http.defaults.headers.common.Authorization = `${res.data.token_type} ${res.data.access_token}`;
                }
            })
            .catch((err) => {
                Vue.$toast.error(err);
            });
        } catch(err) {
            console.log(err)
        }
    },

    logoutUser({commit}): any {
        commit('LOGOUT_USER');
        Vue.$toast.success("Ждем Вашего возвращения!");
    },

    refreshToken({commit}, payload): any {
        try {
            axios
            .post("/auth/token/refresh/", JSON.stringify(payload))
            .then((res) => {
                if (res.status === 200) {
                    commit('REFRESH_TOKEN', res.data);
                }
            })
            .catch((err) => {
                alert()
                let errors = '';
                for (const key in err.response.data){
                    errors += err.response.data[key][0] + '\r\n'
                }
                commit('LOGOUT_USER');
                Vue.$toast.error(errors);
            });
        } catch(err) {
            commit('LOGOUT_USER');
            console.log(err)
        }
    },

    addToFavorites({state, commit}, payload): any {
        try {
            commit('ADD_TO_FAVORITES', payload);
            localforage.getItem('username').then((username) => {
                axios
                .put("/auth/update_settings/", {username: username, settings: state['data']?.settings?.favorites})
                .then((res) => {
                    console.log(res)
                    if (res.status === 200) {
                        console.log('success')
                    }
                })
            
            })  
        } catch(err) {
            console.log(err)
        }
    },

    removeFromFavorites({state, commit}, payload): any {
        try {
            commit('REMOVE_FROM_FAVORITES', payload);
            localforage.getItem('username').then((username) => {
                axios
                .put("/auth/update_settings/", {username: username, settings: state['data']?.settings?.favorites})
                .then((res) => {
                    console.log(res)
                    if (res.status === 200) {
                        console.log('success')
                    }
                })
            })  
        } catch(err) {
            console.log(err)
        }
    },

    getDashboardFromFavorites({state, commit}, payload) {
        const favorites = state['data']?.settings?.favorites;
        if (favorites) 
        
        // @ts-ignore
        return Promise.all(favorites?.map(async (favorite: Favorites): Promise<any> => {
            await axios.get(favorite.activity)
                .then((res) => {
                    commit('UPDATE_FAVORITES_DATA', {
                        ...favorite,
                        count: res.data.length
                    })
                })
        }))
    }
}
