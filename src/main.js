import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
import VueWait from "vue-wait";

Vue.use(VueWait);
new Vue({
  router,
  store,
  vuetify,
  wait: new VueWait(),
  render: (h) => h(App),
}).$mount("#app");
