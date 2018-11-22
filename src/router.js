import Vue from "vue";
import Router from "vue-router";
import Users from "./views/Users";
import UserDetails from "./views/UserDetails";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "users",
      component: Users
    },
    {
      path: "/userdetails/:id",
      name: "userdetails",
      component: UserDetails
    }
  ]
});
