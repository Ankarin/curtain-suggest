<template>
  <div v-if="currentProject">
    <div class="projectTop">
      <v-text-field
        @change="changeProjectName"
        style="max-width: 300px"
        label="Project name"
        :value="currentProject.name"
      ></v-text-field>
      <div style="width: 100%; margin-left: 20px">
        <image-upload />
      </div>
    </div>
    <loader v-if="$wait.is('loading')" />
    <project-images />
  </div>
</template>

<script>
import ImageUpload from "../components/Project/ImageUpload";
import ProjectImages from "../components/Project/ProjectImages";
import { mapActions, mapState } from "vuex";
import Loader from "../components/Loader";

export default {
  name: "Project",
  components: { Loader, ProjectImages, ImageUpload },
  data() {
    return {
      input: [],
    };
  },
  methods: {
    changeProjectName(e) {
      this.changeProjectName(e);
    },
    ...mapActions(["getCurrentProject", "changeProjectName"]),
  },
  watch: {
    $route(val) {
      this.getCurrentProject(val.params.id);
    },
  },
  mounted() {
    this.getCurrentProject(this.$route.params.id);
  },
  computed: {
    ...mapState(["currentProject"]),
  },
};
</script>

<style scoped>
.projectTop {
  display: flex;
  flex-direction: row;
}
</style>
