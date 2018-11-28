<template>
    <div class="polls">
        <md-card :key="poll.pollId" v-for="poll in polls">
            <md-card-header>
                <div class="md-title">{{poll.courseSuggestion.courseName}}</div>
            </md-card-header>
            <md-card-content>
                <div class="md-layout md-gutter md-alignment-space-between-top">
                    <div
                        class="md-layout-item md-size-70"
                    >{{poll.courseSuggestion.courseDescription}}</div>
                    <div class="md-layout-item">
                        <div class="md-layout">
                            <div
                                class="center vote-count md-layout-item md-size-100"
                            >{{poll.voteCount}}</div>
                            <div class="center md-layout-item md-size-100">
                                <md-button
                                    @click="vote({ courseSuggestionId: poll.courseSuggestion.courseSuggestionId, voterId:'abcd'})"
                                >Vote up</md-button>
                            </div>
                        </div>
                    </div>
                </div>
            </md-card-content>
        </md-card>
    </div>
</template>

<script>
export default {
  name: "Poll",
  created: function() {
    this.$http.get("https://localhost:5001/api/suggestions").then(response => {
      console.log(response);
      this.polls = response.body;
    });
  },
  data: () => ({
    polls: []
  }),
  methods: {
    vote: function(vote) {
      console.log(vote);

      fetch("https://localhost:5001/api/suggestions/vote", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vote)
      })
        .then(function(response) {
          console.log(response);
        })
        .then(function(data) {
          console.log(data);
        });

      //   this.$http
      //     .post("https://localhost:5001/api/suggestions/vote", vote, { headers })
      //     .then(response => console.log(response));
    }
  }
};
</script>
<style lang="scss">
.center {
  text-align: center;
}
.vote-count {
  font-size: 50px;
  padding: 5px;
}
</style>
