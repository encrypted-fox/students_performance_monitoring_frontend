import Vue from 'vue';
import { MutationTree } from 'vuex'
import { StudentsState, Student } from './types'

export const mutations: MutationTree<StudentsState> = {
    GET_STUDENTS_REPORT(state: StudentsState, payload: Student[]) {
        state['data'] = payload;
    }
}