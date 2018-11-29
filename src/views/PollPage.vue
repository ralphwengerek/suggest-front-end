<template>
  <div>
    <div class="md-layout md-alignment-center-right">
      <div class="md-layout-item md-large-size-50 md-small-size-100">
        <div class="btn-add-suggestion">
          <div class="md-layout md-gutter">
            <!-- HERE WE NEED TO ALIGN THE TEXT VERTICALLY IN THE CENTER -->
            <div class="md-layout-item md-alignment-center-left">
              <span class="md-headline"> Suggest a new course </span>
            </div>
            <md-button class="md-fab" to="/suggest">
              <md-icon>add</md-icon>
              <md-tooltip md-direction="left">Suggest a course</md-tooltip>
            </md-button>
          </div>
        </div>
      </div>
    </div>
    <div class="polls">
      <md-card :key="poll.pollId" v-for="poll in polls" class="card">
        <md-card-header>
          <div class="md-title">{{poll.courseName}}</div>
        </md-card-header>
        <md-card-content>
          <div class="md-layout md-gutter md-alignment-space-between-top">
            <div class="md-layout-item md-size-70" v-html="nl2br(poll.courseDescription)"></div>
            <div class="md-layout-item">
              <div class="md-layout">
                <div class="center vote-count md-layout-item md-size-100">{{poll.voteCount}}</div>
                <div class="center md-layout-item md-size-100">
                  <md-button
                    class="md-icon-button"
                    :class="{'md-accent': poll.hasVoted,
                    'md-elevation-5':!poll.hasVoted}"
                    @click="vote({ courseSuggestionId: poll.courseSuggestionId, voterId:getUserId(), hasVoted: poll.hasVoted})"
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

    <md-snackbar :md-active.sync="showSnackbar">
      {{errorMessage}}
    </md-snackbar>
  </div>
</template>

<script>
import config from "../config";
import userProfile from "../lib/userprofile";
import utils from "../lib/utils";

export default {
  name: "Poll",
  created: function() {
    this.$http.get(`${config.baseUrl}/suggestions/${this.getUserId()}`).then(
      response => {
        console.log(response);
        this.polls = response.body;
      },
      error => {
        console.log(error);
        this.errorMessage = "There was an error fetching the suggestions...";
        this.showSnackbar = true;
      }
    );
  },
  data: () => ({
    polls: [],
    errorMessage: "",
    showSnackbar: false
  }),
  methods: {
    getUserId: function() {
      return userProfile.getUserId();
    },
    nl2br: function(text) {
      return utils.nl2br(text);
    },
    vote: function(vote) {
      console.log(vote);
      if (!vote.hasVoted) {
        this.$http
          .post(`${config.baseUrl}/suggestions/vote`, vote, config.headers)
          .then(
            response => {
              let poll = this.polls.find(
                poll =>
                  poll.courseSuggestionId == response.body.courseSuggestionId
              );
              poll.voteCount = response.body.voteCount;
              poll.hasVoted = true;
            },
            error => {
              console.log(error);
              this.errorMessage = "There was an error submitting your vote";
              this.showSnackbar = true;
            }
          );
      } else {
        this.$http
          .post(`${config.baseUrl}/suggestions/unvote`, vote, config.headers)
          .then(
            response => {
              let poll = this.polls.find(
                poll =>
                  poll.courseSuggestionId == response.body.courseSuggestionId
              );
              poll.voteCount = response.body.voteCount;
              poll.hasVoted = false;
            },
            error => {
              console.log(error);
              this.errorMessage = "There was an error unvoting your vote";
              this.showSnackbar = true;
            }
          );
      }
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

span.md-headline {
  line-height: 70px;
}
</style>
