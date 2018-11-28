<template>
    <div>
        <form novalidate class="md-layout" @submit.prevent="validateUser">
            <md-card class="md-layout-item md-size-50 md-small-size-100">
                <md-card-header>
                    <div class="md-title">Suggest a course</div>
                </md-card-header>

                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-small-size-100">
                            <md-field :class="getValidationClass('courseTitle')">
                                <label for="course-title">Course Title</label>
                                <md-input name="course-title" id="course-title" v-model="form.courseName"
                                          :disabled="sending"/>
                                <span class="md-error"
                                      v-if="!$v.form.courseName.required">a course title is required</span>
                            </md-field>
                        </div>
                    </div>


                    <md-field :class="getValidationClass('description')">
                        <label for="description">Description</label>
                        <md-textarea type="description" name="description" id="description" v-model="form.courseDescription"
                                     :disabled="sending"/>
                        <span class="md-error" v-if="!$v.form.courseDescription.required">The description is required</span>
                        <span class="md-error" v-else-if="!$v.form.courseDescription.description">Invalid description</span>
                    </md-field>

                    <div class="md-layout-item">
                        <md-field>
                            <md-select v-model="form.abilityLevelId" name="ability-level" id="ability-level"
                                       placeholder="Ability Level">
                                <md-option value="beginner">Beginner</md-option>
                                <md-option value="intermediate">Intermediate</md-option>
                                <md-option value="advanced">Advanced</md-option>
                            </md-select>
                        </md-field>
                    </div>

                    <md-checkbox v-model="runCourse">I want to run this course</md-checkbox>

                    <div id="host-details" v-if="runCourse">

                        <div class="md-layout md-gutter">
                            <div class="md-layout-item">
                                <md-field :class="getValidationClass('authorName')">
                                    <label for="author-name">Author Name</label>
                                    <md-input name="author-name" id="author-name" v-model="form.authorName"
                                              :disabled="sending"/>
                                </md-field>
                            </div>

                            <div class="md-layout-item">
                                <md-field>
                                    <md-select v-model="form.authorRole" name="author-role" id="author-role"
                                               placeholder="Author Role">
                                        <md-option value="roleDev">Product Developer</md-option>
                                    </md-select>
                                </md-field>
                            </div>

                            <div class="md-layout-item">
                                <md-field>
                                    <md-select v-model="form.authorLevel" name="author-level" id="author-level"
                                               placeholder="Author Level">
                                        <md-option value="levelOne">Level 1</md-option>
                                    </md-select>
                                </md-field>
                            </div>
                        </div>
                    </div>
                </md-card-content>

                <md-progress-bar md-mode="indeterminate" v-if="sending"/>
                <md-card-actions>
                    <md-button type="submit" class="md-primary"  v-on:click="submitForm" :disabled="sending">Suggest Course</md-button>
                </md-card-actions>
            </md-card>

            <md-snackbar :md-active.sync="suggestionAdded">The suggestion "{{courseSuggestion}}" was successfully
                submitted!
            </md-snackbar>
        </form>
    </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  name: "FormValidation",
  mixins: [validationMixin],
  data: () => ({
    form: {
      courseName: null,
      courseDescription: null,
      abilityLevelId: null,
      authorName: null,
      authorRole: null,
      authorLevel: null
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
      }
    }
  },

  methods: {
    submitForm() {
      console.log("submitting: ", this.form);
      this.$http
        .post("http://localhost:5000/api/suggestions", this.form, {
          headers: { "Content-Type": "application/json;charset=utf-8" }
        })
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
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
      this.form.courseName = null;
      this.form.courseDescription = null;
      this.form.authorName = null;
      this.form.authorRole = null;
      this.form.authorLevel = null;
    },
    saveUser() {
      this.sending = true;

      // Instead of this timeout, here you can call your API
      window.setTimeout(() => {
        this.courseSuggestion = `${this.form.courseName} ${
          this.form.courseDescription
        }`;
        this.suggestionAdded = true;
        this.sending = false;
        this.clearForm();
      }, 1500);
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveUser();
      }
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
