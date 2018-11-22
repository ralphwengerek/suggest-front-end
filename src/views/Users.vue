<template>
  <div class="users">
      <ul>
      <li v-bind:key="user.userId" v-for="user in users">
          <router-link :to="{name: 'userdetails', params: { id: user.userId}}">
              {{user.firstName + ' ' + user.lastName}}
          </router-link>
      </li>
      </ul>
  </div>
</template>

<script>
export default {
  name: "Users",
  data() {
    return {
      users: this.$http
        .get("http://735429cd.ngrok.io/api/users")
        .then(response => {
          this.users = response.body;
          console.log(response);
        })
    };
  }
};
</script>
