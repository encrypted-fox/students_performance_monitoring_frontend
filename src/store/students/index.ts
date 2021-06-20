import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { StudentsState } from './types'
import { RootState } from '../types'

export const state: StudentsState = {}

const namespaced = true;

export const report: Module<StudentsState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations
}