<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary" md-elevation="0">
        <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <div class="top-toolbar">
          <div class="logo">
            <img src="./assets/ANDigitalLogo.png" alt="AND Digital" height="150" width="150">
          </div>
          <div class="md-title" id="title">Academy Poll</div>
        </div>
      </md-app-toolbar>
      <md-app-drawer :md-active.sync="menuVisible" md-persistent="mini">
        <md-toolbar class="md-transparent" md-elevation="0">
          <span>Navigation</span>
          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="toggleMenu">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>
        <md-list>
          <md-list-item to="/">
            <md-icon>poll</md-icon>
            <span class="md-list-item-text">Academy Poll</span>
          </md-list-item>
          <md-list-item to="/suggest">
            <md-icon>send</md-icon>
            <span class="md-list-item-text">Suggest a course</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>
      <md-app-content>
        <router-view/>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    menuVisible: false
  }),
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    }
  }
};
</script>

<style lang="scss" >
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme(
  "default",
  (
    primary: md-get-palette-color(red, A200),
    // The primary color of your application
      accent: md-get-palette-color(red, A200)// The accent or secondary color
  )
);

@import "~vue-material/dist/theme/all"; // Apply the theme

.top-toolbar {
  display: flex;
  align-items: center;
}

.logo {
  background-color: white;
  padding-right: 10px;
}

.md-app {
  min-height: 350px;
}

// Demo purposes only
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
</style>
