import Vue from "vue";
import Router from "vue-router";
import PollPage from "./views/PollPage";
import SuggestionPage from "./views/SuggestionPage";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "pollPage",
      component: PollPage
    },
    {
      path: "/suggest",
      name: "suggestionPage",
      component: SuggestionPage
    }
  ]
});
