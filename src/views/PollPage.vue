<template>
    <div class="polls">

        <md-card :key="poll.pollId" v-for="poll in polls">

            <md-card-header>
                <div class="md-title">{{poll.courseSuggestion.courseName}}</div>
            </md-card-header>

            <md-card-content>
                <div class="md-layout md-gutter">
                    <div class="course-description md-layout-item">
                        {{poll.courseSuggestion.courseDescription}}
                    </div>

                    <div class="vote-count md-layout-item">
                        <div class="md-layout">
                            <div class="md-layout-item md-size-100">
                                {{poll.voteCount}}
                            </div>
                            <div class="md-layout-item">
                                <md-button>Vote up</md-button>
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
    this.$http.get("http://localhost:5000/api/suggestions").then(response => {
      console.log(response);
      this.polls = response.body;
    });
  },
  data: () => ({
    polls: []
  })
};
</script>
<style lang="scss">
.vote-count {
  font-size: 50px;
}
</style>
