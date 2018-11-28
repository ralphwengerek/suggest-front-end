import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import VueResource from "vue-resource";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";

Vue.config.productionTip = false;
Vue.use(VueMaterial);
Vue.use(VueResource);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
