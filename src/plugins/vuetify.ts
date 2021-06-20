import Vue from "vue";
import Vuetify from "vuetify/lib";
import dark from './themes/dark';

Vue.use(Vuetify);


const vuetify = new Vuetify({
    icons: {
        iconfont: 'mdiSvg', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
    },
    theme: {
        options: {
            customProperties: true,
        },
        dark: false,
        themes: {  
            dark
        },
    },
});

export default vuetify;
