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
                                <md-input name="course-title" id="course-title" v-model="form.courseTitle"
                                          :disabled="sending"/>
                                <span class="md-error"
                                      v-if="!$v.form.courseTitle.required">a course title is required</span>
                            </md-field>
                        </div>
                    </div>


                    <md-field :class="getValidationClass('description')">
                        <label for="description">Description</label>
                        <md-textarea type="description" name="description" id="description"  v-model="form.description"
                                     :disabled="sending"/>
                        <span class="md-error" v-if="!$v.form.description.required">The description is required</span>
                        <span class="md-error" v-else-if="!$v.form.description.description">Invalid description</span>
                    </md-field>

                    <div class="md-layout md-gutter">

                        <div class="md-layout-item">
                            <md-field>
                                <md-select v-model="deliveryMethod" name="delivery-Method" id="delivery-Method" placeholder="Delivery Method">
                                    <md-option value="workshop">Workshop</md-option>

                            </md-select>
                            </md-field>
                        </div>

                        <div class="md-layout-item">
                            <md-field>
                                <md-select v-model="abilityLevel" name="ability-level" id="ability-level" placeholder="Ability Level">
                                    <md-option value="levelOne">Level 1</md-option>

                                </md-select>
                            </md-field>
                        </div>


                    </div>
                </md-card-content>

                <md-progress-bar md-mode="indeterminate" v-if="sending"/>

                <md-card-actions>
                    <md-button type="submit" class="md-primary" :disabled="sending">Suggest Course</md-button>
                </md-card-actions>
            </md-card>

            <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>
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
      courseTitle: null,
      description: null,
      deliveryMethod: null,
      abilityLevel: null
    },
    deliveryMethods: [],
    abilityLevels: [],
    userSaved: false,
    sending: false,
    lastUser: null
  }),
  validations: {
    form: {
      courseTitle: {
        required
      },

      description: {
        required
      }
    }
  },
  methods: {
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
      this.form.courseTitle = null;
      this.form.lastName = null;
      this.form.age = null;
      this.form.gender = null;
      this.form.description = null;
    },
    saveUser() {
      this.sending = true;

      // Instead of this timeout, here you can call your API
      window.setTimeout(() => {
        this.lastUser = `${this.form.courseTitle} ${this.form.lastName}`;
        this.userSaved = true;
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
