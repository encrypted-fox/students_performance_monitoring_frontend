import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { RootState } from './types'
import { user } from './user/index'
import { menu } from './menu/index'
import { report } from './students/index'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence<RootState>({
    storage: window.localStorage
})

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
    state: {
        version: 1
    },
    modules: {
        user,
        menu,
        report
        
    },
    plugins: [vuexLocal.plugin]
}

export default new Vuex.Store<RootState>(store);