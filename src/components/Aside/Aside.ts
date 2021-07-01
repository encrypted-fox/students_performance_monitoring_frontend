import { Route } from '@/store/menu/types';
import Vue from 'vue'
import Component from 'vue-class-component'
import { Action, Getter } from 'vuex-class';

@Component({
    name: 'v-aside'
})

export default class Aside extends Vue {
    @Action('logoutUser', { namespace: 'user' })
    logoutUser: any
    
    @Action('setCurrentRoute', { namespace: 'menu' })
    setCurrent: any
    @Action('getMenuRoutes', { namespace: 'menu' })
    getMenuRoutes: any

    @Getter('menu_routes', {namespace: 'menu'}) getterMenu: any;
    @Getter('current_route', {namespace: 'menu'}) getterCurrentRoute: any;

    public get desktopVersion() {
        return this.$vuetify.breakpoint.mdAndUp
    }
    
    private setCurrentRoute(route: Route) {
        this.setCurrent(route);
        this.$router.push(`/dashboard/reports/${route.activity}`)
    }

    private logout() {
        this.logoutUser()
    }

    public mounted () {
        this.getMenuRoutes()
    }
}