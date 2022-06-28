import Vue from "vue";
import App from "./App.vue";
//생성한 스토어 import
// eslint-disable-next-line no-unused-vars
import { store } from "./store/store";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  store,
}).$mount("#app");
