import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import store from "./store";
import router from "./router";

import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

import Vue2Editor from "vue2-editor";
Vue.use(Vue2Editor);

Vue.filter("currency", (value) =>
  new Intl.NumberFormat("en-Us", { style: "currency", currency: "USD" }).format(
    value
  )
);

new Vue({
  render: (h) => h(App),
  store,
  router,
}).$mount("#app");
