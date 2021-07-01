import { ActionTree } from "vuex";
import axios from 'axios'
import { StudentsState, Student } from "./types";
import { Route } from "../menu/types";
import { RootState } from "../types";
import Vue from 'vue'
import moment from 'moment'

/* eslint-disable */
export const actions: ActionTree<StudentsState, RootState> = {
    getStudentsReport({commit}, payload: Route): any {
        try {
            axios
            .get(`/${payload}`)
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    commit('GET_STUDENTS_REPORT', res.data);
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

    downloadStudentsReportCSV({commit}, payload): any {
        try {
            axios({
                url: `/makeCSV/?document_data=[${payload}]`,
                method: "GET",
                headers: {
                    'Content-Type': 'text/csv; charset=utf-8'
                }
            }).then((res) => {
                console.log(res)
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${moment().format('YYYY-MM-DD-HH-mm-ss')}.csv`);
                document.body.appendChild(link);
                link.click();
                Vue.$toast.success("Успешно!");
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

    downloadStudentsReportXLSX({commit}, payload): any {
        try {
            // @ts-ignore
            window.location = `https://students-monitor.herokuapp.com/api/v0/makeXLSX?document_data=[${payload}]`
        } catch (err) {
            console.log(err)
        }
    }
}
