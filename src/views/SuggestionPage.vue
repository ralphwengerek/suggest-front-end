<template>
  <div class="user">
    <div>
      <div>First name : {{user.firstName}}</div>
      <div>Last name : {{user.lastName}}</div>
      <div>Age : {{user.age}}</div>
      <div>Nationality : {{user.nationality}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserDetails",
  data() {
    return {
      user: this.$http
        .get(`https://localhost:5001/api/polls/${this.$route.params.id}`)
        .then(response => {
          this.user = response.body;
          console.log(response);
        })
    };
  }
};
</script>
