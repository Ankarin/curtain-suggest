<template>
  <v-app id="inspire">
    <v-app-bar app>
      <v-toolbar-title style="cursor: pointer" @click="goHome"
        >App</v-toolbar-title
      >
      <v-spacer> </v-spacer>
      <auth />
    </v-app-bar>

    <v-main>
      <v-container style="max-width: 1400px">
        <router-view v-if="user" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Auth from "./components/Buttons/Auth";
import { mapState } from "vuex";
export default {
  components: { Auth },
  data: () => ({}),
  methods: {
    goHome() {
      this.$route.name === "Home" || this.$router.replace({ name: "Home" });
    },
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>
<style lang="scss">
.galleryGrid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  grid-gap: 20px;
  padding: 20px;
}

@media screen and (max-width: 1200px) {
  .galleryGrid {
    grid-template-columns: 1fr 1fr;
  }
}
@media screen and (max-width: 700px) {
  .galleryGrid {
    grid-template-columns: 1fr;
  }
  #imageAnalyticsWrapper {
    padding: 5px;
  }
}
</style>
