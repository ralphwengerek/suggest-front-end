<template>
  <div >
    <form novalidate @submit.prevent="validateForm">
      <div class="md-layout md-alignment-top-center">
        <div class="md-layout-item md-large-size-50 md-small-size-100">
        <md-card>
          <md-card-header  class="center">
            <div class="md-title ">Suggest a course</div>
          </md-card-header>

          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('courseName')">
                  <label for="course-name">Course Title</label>
                  <md-input
                    name="courseName"
                    id="course-name"
                    v-model="form.courseName"
                    :disabled="sending"
                  />
                  <span
                    class="md-error"
                    v-if="!$v.form.courseName.required"
                  >A course title is required</span>
                </md-field>
              </div>
            </div>

            <md-field :class="getValidationClass('courseDescription')">
              <label for="course-description">Description</label>
              <md-textarea
                type="course-description"
                name="courseDescription"
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
                  name="abilityLevel"
                  id="ability-level"
                  placeholder="Ability Level"
                >
                  <md-option
                    v-for="abilityLevel in abilityLevels"
                    :key="abilityLevel.abilityLevelId"
                    :value="abilityLevel.abilityLevelId"
                  >{{ abilityLevel.description }}</md-option>
                </md-select>
                <span
                  class="md-error"
                  v-if="!$v.form.abilityLevelId.required"
                >Please select an ability level</span>
              </md-field>
            </div>

            <md-checkbox v-model="runCourse">I want to run this course</md-checkbox>
            <div id="host-details" v-if="runCourse">
              <div class="md-layout md-gutter">
                <div class="md-layout-item">
                  <md-field :class="getValidationClass('authorName')">
                    <label for="author-name">Author Name</label>
                    <md-input name="authorName" id="author-name" v-model="form.authorName"/>
                    <span class="md-error" v-if="!$v.form.authorName.required">Your name is required</span>
                  </md-field>
                </div>

                <div class="md-layout-item">
                  <md-field :class="getValidationClass('authorRole')">
                    <md-select
                      v-model="form.authorRole"
                      name="authorRole"
                      id="author-role"
                      placeholder="Author Role"
                    >
                      <md-option value="Product Developer">Product Developer</md-option>
                      <md-option value="Product Analyst">Product Analyst</md-option>
                    </md-select>
                    <span class="md-error" v-if="!$v.form.authorRole.required">Your role is required</span>
                  </md-field>
                </div>

                <div class="md-layout-item">
                  <md-field :class="getValidationClass('authorLevel')">
                    <md-select
                      v-model="form.authorLevel"
                      name="authorLevel"
                      id="author-level"
                      placeholder="Author Level"
                    >
                      <md-option value="Level 1">Level 1</md-option>
                      <md-option value="Level 2">Level 2</md-option>
                      <md-option value="Level 3">Level 3</md-option>
                      <md-option value="Level 4">Level 4</md-option>
                      <md-option value="Level 5">Level 5</md-option>
                    </md-select>
                    <span
                      class="md-error"
                      v-if="!$v.form.authorLevel.required"
                    >Your level is required</span>
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
        </div>
        <md-snackbar :md-active.sync="suggestionAdded">
          The suggestion "{{courseSuggestion}}" was successfully
          submitted!
        </md-snackbar>
      </div>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { requiredIf } from "vuelidate/lib/validators";

import config from "../config";

export default {
  name: "SuggestionPage",
  mixins: [validationMixin],
  created: function() {
    console.log("Suggestion page created");
    this.$http.get(`${config.baseUrl}/suggestions/abilitylevels`).then(
      response => {
        this.abilityLevels = response.body;
      },
      error => {
        console.log(error);
      }
    );
  },
  data: () => ({
    form: {
      courseName: "",
      courseDescription: "",
      abilityLevelId: null,
      authorName: "",
      authorRole: "",
      authorLevel: ""
    },
    abilityLevels: [],
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
      },
      authorName: {
        required: requiredIf(function() {
          return this.runCourse;
        })
      },
      authorRole: {
        required: requiredIf(function() {
          return this.runCourse;
        })
      },
      authorLevel: {
        required: requiredIf(function() {
          return this.runCourse;
        })
      }
    }
  },
  methods: {
    submitForm() {
      if (!this.$v.form.$invalid) {
        console.log("submitting: ", this.form);

        this.sending = true;

        this.$http
          .post(`${config.baseUrl}/suggestions`, this.form, config.headers)
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
      this.form.CourseDescription = "";
      this.form.AuthorName = "";
      this.form.AuthorRole = "";
      this.form.AuthorLevel = null;
    },
    validateForm() {
      this.$v.$touch();
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
.center {
  text-align: center;
}
</style>
