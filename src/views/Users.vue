<template>
  <div class="users">
      <ul>
      <li v-bind:key="user" v-for="user in users">
          <router-link :to="{name: 'userdetails', params: { id: user.userId}}">
              {{user.firstName + ' ' + user.lastName}}
          </router-link>
      </li>
      </ul>
  </div>
</template>

<script>
import userData from "../data";

export default {
  name: "Users",
  data() {
    return {
      users: userData
    };
  }
};
</script>
