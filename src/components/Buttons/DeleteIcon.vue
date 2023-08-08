<template>
  <v-btn
    style="margin: 0 !important"
    @click.stop="deleteItem"
    class="ma-2"
    text
    icon
    color="red lighten-2"
  >
    <v-icon>mdi-delete</v-icon>
  </v-btn>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    type: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
  },
  name: "DeleteIcon",
  methods: {
    deleteItem() {
      this.type === "image"
        ? this.deleteImage(this.id)
        : this.type === "project"
        ? this.deleteProject(this.id)
        : console.log("Error, nothing to delete");
    },
    ...mapActions(["deleteImage", "deleteProject"]),
  },
};
</script>

<style scoped></style>
