import Vue from "vue";
import Router from "vue-router";
import Poll from "./views/Poll";
import Suggest from "./views/Suggest";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "poll",
      component: Poll
    },
    {
      path: "/suggest",
      name: "suggest",
      component: Suggest
    }
  ]
});
