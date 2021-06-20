import Vue from 'vue';
import { MutationTree } from 'vuex'
import { UserState, User, Favorites } from './types'
import router from '../../router/index'
import moment from 'moment'

export const mutations: MutationTree<UserState> = {
    REGISTER_USER(state: UserState, payload: User) {
        const now = moment().valueOf();
        const duration: number = (payload.expires_in || 0) * 1000
        const time_of_life: number = now + duration
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
        state['data'] = {
            ...payload,
            expires_date: time_of_life
        }
        setTimeout(() => {
            router.push('/dashboard');
        })
    },
    REFRESH_TOKEN(state: UserState, payload: User) {
        alert('refresh')
        state['data'] = { 
            ...payload
        }
    },
    LOGOUT_USER(state: UserState) {
        delete Vue.prototype.$http.defaults.headers.common["Authorization"];
        state['data'] = {
            access_token: '',
            refresh_token: '',
            settings: {
                favorites: []
            },
            expires_in: 0,
            expires_date: 0
        }
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