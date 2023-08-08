<template>
  <div>
    <div class="newProject">
      <v-btn width="250px" color="primary" @click="newProject"
        >Create new project</v-btn
      >
    </div>
    <project-list />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { Navigation } from "../mixins/navigation";
import ProjectList from "../components/ProjectList";

export default {
  mixins: [Navigation],
  name: "Home",
  components: {
    ProjectList,
  },
  methods: {
    async newProject() {
      const id = await this.createNewProject();
      id && this.openProject(id);
    },
    ...mapActions(["createNewProject"]),
  },
};
</script>
<style scoped lang="scss">
.newProject {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px 0 20px 0;
}
</style>
