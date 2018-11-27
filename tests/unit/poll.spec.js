import { shallowMount } from "@vue/test-utils";
import PollPage from "../../src/views/PollPage.vue";
import VueMaterial from "vue-material";
import Vue from "vue";

Vue.use(VueMaterial);

describe("PollPage.vue", () => {
  it("renders fake data on the front end", () => {
    const msg = [
      {
        pollId: 0,
        courseTitle: "Vue.js",
        description: "elbwaerlvberlibuvelrjvbqelrjvb"
      },
      {
        pollId: 1,
        courseTitle: "JavaScript",
        description: "elbwaerlvberlibuvelrjvbqelrjvb"
      },
      {
        pollId: 2,
        courseTitle: "PHP",
        description: "elbwaerlvberlibuvelrjvbqelrjvb"
      },
      {
        pollId: 3,
        courseTitle: "Java",
        description: "elbwaerlvberlibuvelrjvbqelrjvb"
      }
    ];
    const wrapper = shallowMount(PollPage);
    const vm = wrapper.vm;
    expect(vm.polls).toEqual(msg);
  });
});
