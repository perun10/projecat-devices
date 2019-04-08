import Vue from "vue";
import './plugins/vuetify'
import App from "./App.vue";
import router from "./router";
import { store } from "./store/store";
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false;

Vue.use(VueAxios, axios)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
