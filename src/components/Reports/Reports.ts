import { Favorites } from '@/store/user/types'
import { Students } from '@/utils/student_helper'
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import Table from '../Table/Table'

declare type StudentsList = keyof typeof Students;

@Component({
    name: 'Reports',
    components: {
        Table
    }
})

export default class Reports extends Vue {
    public selectedItems: number[] = [];
    
    @Action('setCurrentRouteByName', { namespace: 'menu' })
    setCurrentRouteByName: any

    @Action('getStudentsReport', { namespace: 'report' })
    getStudentsReport: any

    @Action('addToFavorites', { namespace: 'user' })
    addToFavorites: any

    @Action('removeFromFavorites', { namespace: 'user' })
    removeFromFavorites: any

    @Getter('current_route', {namespace: 'menu'}) getterCurrentRoute: any;

    @Getter('current_report', {namespace: 'report'}) getterCurrentReport: any;

    @Getter('favorites', {namespace: 'user'}) getterFavorites: any;

    @Watch('getterCurrentRoute')
    private changeRoute() {
        if (this.$route.params.type) {
            this.getStudentsReport(this.$route.params.type);
            this.selectedItems = [];
        }
        else {
            this.getStudentsReport(`retrieve_student_records?id=${this.$route.params.user_details}`) ;
            this.selectedItems = [];
        }
    }

    public get isFavorite() {
        const target = this.$route.params.type;
        return (this.getterFavorites.find((item: Favorites) => item.activity == target) && true) || false
    }

    public get headers(): any[] {
        const headers: any = [];
        if (this.getterCurrentReport && this.getterCurrentReport[0]) {
            const elem = Object.keys(this.getterCurrentReport[0]);
            elem.forEach((key: string, index: number) => {
                if (key !== 'update_date'){
                    headers.push({ text: Students[key as StudentsList], value: key, filterable: this.selectedItems.includes(index) });
                }
            });
        }
        return headers
    }

    public setSelected(newItems: number[] | []) {
        this.selectedItems = newItems;
    }

    public callAddToFavorite() {
        this.addToFavorites({...this.getterCurrentRoute, count: this.getterCurrentReport.length});
    }

    public callRemoveFromFavorite() {
        this.removeFromFavorites(this.getterCurrentRoute);
    }
    
    public mounted() {
        if (this.$route.params.type) {
            console.log('type')
            if (this.getterCurrentRoute.activity !== this.$route.params.type) {
                this.setCurrentRouteByName(this.$route.params.type)
            }
            this.getStudentsReport(
                this.getterCurrentRoute.activity);
        } else {
            console.log('user_details')
            if (this.$route.params.user_details) { 
                this.getStudentsReport(`retrieve_student_records?id=${this.$route.params.user_details}`) 
                this.setCurrentRouteByName(this.$route.params.user_details)
            } 
        }   
    }

    
}