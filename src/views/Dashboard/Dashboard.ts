import { Route } from '@/store/menu/types'
import { Favorites } from '@/store/user/types'
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

@Component({
    name: 'Dashboard'
})

export default class Dashboard extends Vue {
    @Action('getDashboardFromFavorites', { namespace: 'user' })
    getDashboardFromFavorites: any
    @Action('setCurrentRoute', { namespace: 'menu' })
    setCurrent: any

    @Action('resetCurrentRoute', { namespace: 'menu' })
    resetRoute: any

    @Action('removeFromFavorites', { namespace: 'user' })
    removeFromFavorites: any

    @Getter('favorites', {namespace: 'user'}) getterFavorites: any;
    
    private setCurrentRoute(route: Route) {
        this.setCurrent(route);
        this.$router.push(`/dashboard/reports/${route.activity}`)
    }

    private callRemoveFromFavorite(favorite: Favorites) {
        this.removeFromFavorites(favorite)
    }

    mounted() {
        this.resetRoute()
        this.getDashboardFromFavorites(this.getterFavorites)
    }
}