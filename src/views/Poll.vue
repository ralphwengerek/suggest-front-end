<template>
  <div class="users">
      <ul>
      <li v-bind:key="poll.pollId" v-for="poll in polls">
          <!-- <router-link :to="{name: 'userdetails', params: { id: user.userId}}">
              {{user.firstName + ' ' + user.lastName}}
          </router-link> -->
          
      </li>
      </ul>
  </div>
</template>

<script>
export default {
  name: "Poll",
  data() {
    return {
      polls: this.$http
        .get("https://localhost:5001/api/polls")
        .then(response => {
          this.polls = response.body;
          console.log(response);
        })
    };
  }
};
</script>
