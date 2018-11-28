<template>
    <div class="polls">
        <md-card :key="poll.pollId" v-for="poll in polls">
            <md-card-header>
                <div class="md-title">{{poll.courseName}}</div>
            </md-card-header>
            <md-card-content>
                <div class="md-layout md-gutter md-alignment-space-between-top">
                    <div
                        class="md-layout-item md-size-70"
                    >{{poll.courseDescription}}</div>
                    <div class="md-layout-item">
                        <div class="md-layout">
                            <div class="center vote-count md-layout-item md-size-100">
                                {{poll.voteCount}}
                            </div>
                            <div class="center md-layout-item md-size-100">
                                <md-button
                                    @click="vote({ courseSuggestionId: poll.courseSuggestionId, voterId:'abcd'})"
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
import { config } from "../config";

export default {
  name: "Poll",
  created: function() {
    this.$http.get(`${config.baseUrl}/suggestions`).then(response => {
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
        .then(response => console.log(response));
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
