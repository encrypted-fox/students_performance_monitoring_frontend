import { GetterTree } from 'vuex'
import { StudentsState, Student } from './types'
import { RootState } from '../types'

export const getters: GetterTree<StudentsState, RootState> = {
    current_report(state): Student[] | [] {
        const { data } = state;
        return data || [];
    },
}