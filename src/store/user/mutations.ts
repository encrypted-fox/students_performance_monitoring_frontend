import Vue from 'vue';
import { MutationTree } from 'vuex'
import { UserState, User, Favorites } from './types'
import router from '../../router/index'
import moment from 'moment'
import localforage from 'localforage'
import axios from 'axios'

/* eslint-disable */
localforage.config({
    driver      : localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
    name        : 'myApp',
    version     : 1.0,
    storeName   : 'username', // Should be alphanumeric, with underscores.
    description : 'username' 
});

export const mutations: MutationTree<UserState> = {
    REGISTER_USER(state: UserState, payload: User) {
        const now = moment().valueOf();
        const duration: number = (payload.expires_in || 0) * 1000
        const time_of_life: number = now + duration
        localforage.setItem('username', payload.username)
        state['data'] = {
            ...payload,
            expires_date: time_of_life
        }
        setTimeout(() => {
            router.push('/dashboard');
        })
    },
    AUTH_USER(state: UserState, payload: User) {
        const now = moment().valueOf();
        const duration: number = (payload.expires_in || 0) * 1000
        const time_of_life: number = now + duration
        localforage.setItem('username', payload.username).then((us) => console.log(us))
        state['data'] = {
            ...payload,
            expires_date: time_of_life
        }
        console.log(state)
        // @ts-ignore
        state['data'].settings?.favorites = JSON.parse(payload.settings)
        console.log(state)
        setTimeout(() => {
            router.push('/dashboard');
        })
    },
    REFRESH_TOKEN(state: UserState, payload: User) {
        alert('refresh')
        state['data'] = { 
            ...payload
        }
        localforage.getItem('username').then((username) => {
            axios
            .post("/auth/get_user_settings/", {username: username})
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    console.log('success')
                    // @ts-ignore
                    state['data']?.settings?.favorites = JSON.parse(res)
                }
            })
        })  
    },
    LOGOUT_USER(state: UserState) {
        delete Vue.prototype.$http.defaults.headers.common["Authorization"];
        state['data'] = {
            username: '',
            access_token: '',
            refresh_token: '',
            settings: {
                favorites: []
            },
            expires_in: 0,
            expires_date: 0
        }
        localforage.removeItem('username')
        router.push('/');
    },

    ADD_TO_FAVORITES(state: UserState, payload: Favorites) {
        const favorites = state.data?.settings?.favorites || [];
        favorites?.push(payload)

        state['data'] = {
            ...state['data'],
            settings: {
                ...state['data']?.settings,
                favorites: favorites
            }
        }
        Vue.$toast.success('Добавлено в избранное!');
    },

    REMOVE_FROM_FAVORITES(state: UserState, payload: Favorites) {
        const favorites = state.data?.settings?.favorites || [];
        const deletedIndex = favorites.findIndex((el) => el.id === payload.id)
        favorites.splice(deletedIndex, 1);

        state['data'] = {
            ...state['data'],
            settings: {
                ...state['data']?.settings,
                favorites: favorites
            }
        }
        Vue.$toast.success('Убрано из избранного!');
    },

    UPDATE_FAVORITES_DATA(state: UserState, payload: Favorites) {
        const favorites = state.data?.settings?.favorites || [];
        const selectedIndex = favorites.findIndex((el) => el.id === payload.id)
        favorites[selectedIndex] = payload;

        state['data'] = {
            ...state['data'],
            settings: {
                ...state['data']?.settings,
                favorites: favorites
            }
        }
    }
}