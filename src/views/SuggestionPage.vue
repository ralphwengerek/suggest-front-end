<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validateForm">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Suggest a course</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('courseName')">
                <label for="course-name">Course Title</label>
                <md-input
                  name="course-name"
                  id="course-name"
                  v-model="form.courseName"
                  :disabled="sending"
                />
                <span
                  class="md-error"
                  v-if="!$v.form.courseName.required"
                >a course title is required</span>
              </md-field>
            </div>
          </div>

          <md-field :class="getValidationClass('courseDescription')">
            <label for="description">Description</label>
            <md-textarea
              type="course-description"
              name="course-description"
              id="course-description"
              v-model="form.courseDescription"
              :disabled="sending"
            />
            <span
              class="md-error"
              v-if="!$v.form.courseDescription.required"
            >The description is required</span>
          </md-field>

          <div class="md-layout-item">
            <md-field :class="getValidationClass('abilityLevelId')">
              <md-select
                v-model="form.abilityLevelId"
                name="ability-level"
                id="ability-level"
                placeholder="Ability Level"
              >
                <md-option value="1">Beginner</md-option>
                <md-option value="2">Intermediate</md-option>
                <md-option value="3">Advanced</md-option>
              </md-select>
              <span
                class="md-error"
                v-if="!$v.form.abilityLevelId.required"
              >Please enter the ability level</span>
            </md-field>
          </div>

          <md-checkbox v-model="runCourse">I want to run this course</md-checkbox>

          <div id="host-details" v-if="runCourse">
            <div class="md-layout md-gutter">
              <div class="md-layout-item">
                <md-field :class="getValidationClass('authorName')">
                  <label for="author-name">Author Name</label>
                  <md-input
                    name="author-name"
                    id="author-name"
                    v-model="form.authorName"
                    :disabled="sending"
                  />
                </md-field>
              </div>

              <div class="md-layout-item">
                <md-field>
                  <md-select
                    v-model="form.authorRole"
                    name="author-role"
                    id="author-role"
                    placeholder="Author Role"
                  >
                    <md-option value="roleDev">Product Developer</md-option>
                  </md-select>
                </md-field>
              </div>

              <div class="md-layout-item">
                <md-field>
                  <md-select
                    v-model="form.authorLevel"
                    name="author-level"
                    id="author-level"
                    placeholder="Author Level"
                  >
                    <md-option value="levelOne">Level 1</md-option>
                  </md-select>
                </md-field>
              </div>
            </div>
          </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending"/>
        <md-card-actions>
          <md-button
            type="submit"
            class="md-primary"
            v-on:click="submitForm"
            :disabled="sending"
          >Suggest Course</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="suggestionAdded">
        The suggestion "{{courseSuggestion}}" was successfully
        submitted!
      </md-snackbar>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  name: "SuggestionPage",
  mixins: [validationMixin],
  data: () => ({
    form: {
      courseName: null,
      courseDescription: null,
      abilityLevelId: null,
      authorName: "",
      authorRole: "",
      authorLevel: ""
    },
    abilityLevelIds: [],
    authorLevels: [],
    authorRole: [],
    suggestionAdded: false,
    sending: false,
    courseSuggestion: null,
    runCourse: false
  }),
  validations: {
    form: {
      courseName: {
        required
      },
      courseDescription: {
        required
      },
      abilityLevelId: {
        required
      }
    }
  },
  methods: {
    submitForm() {
      if (!this.$v.form.$invalid) {
        console.log("submitting: ", this.form);

        this.sending = true;

        this.$http
          .post("http://localhost:5000/api/suggestions", this.form, {
            headers: { "Content-Type": "application/json;charset=utf-8" }
          })
          .then(
            success => {
              console.log("SUCCESS:", success);
              this.suggestionAdded = true;
              this.clearForm();
            },
            failed => {
              console.log("FAILED:", failed);
            }
          )
          .finally(() => {
            this.sending = false;
          });
      }
      console.log("Not valid....");
    },
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.courseName = "";
      this.form.courseDescription = "";
      this.form.authorName = "";
      this.form.authorRole = "";
      this.form.authorLevel = null;
    },
    validateForm() {
      this.$v.$touch();

      return !this.$v.$invalid;
    }
  }
};
</script>

<style lang="scss" scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
</style>
