import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { MenuState } from './types'
import { RootState } from '../types'

export const state: MenuState = {}

const namespaced = true;

export const menu: Module<MenuState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations
}