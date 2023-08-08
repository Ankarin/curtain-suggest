<template>
  <v-row>
    <v-col
      v-for="project in projects"
      class="d-flex child-flex"
      :key="project.id"
      md="6"
      sm="12"
      xs="12"
    >
      <v-card @click="openProject(project.id)">
        <v-card-title
          >{{ project.name }}
          <v-spacer />
          <delete-icon :id="project.id" type="project" />
        </v-card-title>
        <v-img
          max-height="500px"
          :src="loadPreview(project.preview)"
          class="grey lighten-2"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
import { Navigation } from "../mixins/navigation";
import DeleteIcon from "./Buttons/DeleteIcon";
export default {
  components: { DeleteIcon },
  mixins: [Navigation],
  name: "ProjectList",
  methods: {
    loadPreview(preview) {
      return preview ? preview : "placeholder.gif";
    },
  },
  computed: {
    ...mapState(["projects"]),
  },
};
</script>
