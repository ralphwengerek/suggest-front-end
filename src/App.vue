<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar
        class="md-primary"
        md-elevation="2"
      >
        <md-button
          class="md-icon-button"
          @click="toggleMenu"
          v-if="!menuVisible"
        >
          <md-icon>menu</md-icon>
        </md-button>
        <div class="top-toolbar">
          <div class="logo">
            <img
              src="./assets/ANDigitalLogo.png"
              alt="AND Digital"
              height="150"
              width="150"
            >
          </div>
          <div class="md-title">
            <div class="title">Academy Poll</div>
          </div>
        </div>
      </md-app-toolbar>
      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar
          class="md-transparent"
          md-elevation="0"
        >
          <span>Navigation</span>
          <div class="md-toolbar-section-end">
            <md-button
              class="md-icon-button md-dense"
              @click="toggleMenu"
            >
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>
        <md-list>
          <md-list-item
            to="/"
            @click="toggleMenu()"
          >
            <md-icon>poll</md-icon>
            <span class="md-list-item-text">Academy Poll</span>
            <md-tooltip
              md-direction="right"
              v-show="!menuVisible"
            >Academy Poll</md-tooltip>
          </md-list-item>
          <md-list-item
            to="/suggest"
            @click="toggleMenu()"
          >
            <md-icon>add</md-icon>
            <span class="md-list-item-text">Suggest a course</span>
            <md-tooltip
              md-direction="right"
              v-show="!menuVisible"
            >Suggest a course</md-tooltip>
          </md-list-item>
        </md-list>
      </md-app-drawer>
      <md-app-content>
        <router-view />
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
    primary: md-get-palette-color(red, 600),
    accent: md-get-palette-color(red, 400)
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

.title {
  margin-left: 30px;
}

.md-app {
  min-height: 350px;
}

div.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}

div.md-app-toolbar {
  min-height: 60px;
}
</style>
