<template>
  <div class="polls">

    <md-card :key="poll.pollId" v-for="poll in polls">

      <md-card-header>
        <div class="md-title">{{poll.courseTitle}}</div>
      </md-card-header>

      <md-card-content>
        <div class="md-title">{{poll.description}}</div>
      </md-card-content>

      <!--<md-card-header>
        <div class="md-title">This is the title of the poll</div>
      </md-card-header>

      <md-card-content>
        this is the content of the poll, description etc
      </md-card-content>-->

      <md-card-actions>
        <md-button>Vote up</md-button>
        <md-button>Vote down</md-button>
      </md-card-actions>
    </md-card>

  </div>
</template>

<script>
export default {
  name: "Poll",
  data: function() {
    return {
      polls: [
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
      ]
    };
  }
  /*created: function() {
    this.$http.get("https://localhost:5001/api/polls").then(response => {
      this.data.polls = response.body;
      console.log(response);
    });
  },
  data: () => {
    return {
      polls: []
    };
  }*/
};
</script>
<style lang="scss">
</style>
