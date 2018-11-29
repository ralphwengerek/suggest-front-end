<template>
  <div>
    <div class="btn-add-suggestion">
      <md-button
        class="md-fab"
        to="/suggest"
      >
        <md-icon>add</md-icon>
        <md-tooltip md-direction="left">Suggest a course</md-tooltip>
      </md-button>
    </div>
    <div class="polls">
      <md-card
        :key="poll.pollId"
        v-for="poll in polls"
        class="card"
      >
        <md-card-header>
          <div class="md-title">{{poll.courseName}}</div>
        </md-card-header>
        <md-card-content>
          <div class="md-layout md-gutter md-alignment-space-between-top">
            <div class="md-layout-item md-size-70">{{poll.courseDescription | nl2br }}</div>
            <div class="md-layout-item">
              <div class="md-layout">
                <div class="center vote-count md-layout-item md-size-100">{{poll.voteCount}}</div>
                <div class="center md-layout-item md-size-100">
                  <md-button
                    class="md-icon-button md-raised md-accent"
                    @click="vote({ courseSuggestionId: poll.courseSuggestionId, voterId:'abcd'})"
                  >
                    <md-icon>thumb_up</md-icon>
                  </md-button>
                </div>
              </div>
            </div>
          </div>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import config from "../config";

export default {
  name: "Poll",
  created: function() {
    this.$http.get(`${config.baseUrl}/suggestions/voterId`).then(response => {
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
      this.$http
        .post(`${config.baseUrl}/suggestions/vote`, vote, config.headers)
        .then(
          response => {
            let poll = this.polls.find(
              poll =>
                poll.courseSuggestionId == response.body.courseSuggestionId
            );
            console.log("Voted poll", poll);
            poll.voteCount = response.body.voteCount;
          },
          error => {
            console.log(error);
          }
        );
    }
  }
};
</script>
<style lang="scss">
.center {
  text-align: center;
}
.btn-add-suggestion {
  padding: 20px;
  text-align: right;
}
.vote-count {
  font-size: 50px;
  padding: 20px;
}
.card {
  margin-bottom: 20px;
}
</style>
