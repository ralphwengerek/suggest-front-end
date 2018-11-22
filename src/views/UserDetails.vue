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
import userData from "../data";

export default {
  name: "UserDetails",
  data() {
    return {
      user: userData.find(user => user.userId === this.$route.params.id)
    };
  }
};
</script>
