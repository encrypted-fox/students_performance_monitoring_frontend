import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import vuetify from "./plugins/vuetify";
import Axios from 'axios';
import store from './store';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import './main.scss'

Vue.config.productionTip = false;

Vue.prototype.$http = Axios;
Vue.prototype.$http.defaults.baseURL = process.env.VUE_APP_API_HOST;
Vue.prototype.$http.defaults.headers.get['Content-Type'] = 'application/json';
Vue.prototype.$http.defaults.headers.post['Content-Type'] = 'application/json';
if (store.getters['user/token_data'].access_token){
  Vue.prototype.$http.defaults.headers.common.Authorization = `${store.getters['user/token_data'].token_type} ${store.getters['user/token_data'].access_token}`;
}
Vue.use(Toast, {
  position: 'bottom-right'
});


new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");
