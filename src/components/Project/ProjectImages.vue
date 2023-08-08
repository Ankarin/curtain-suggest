<template>
  <v-row>
    <v-col
      v-for="(image, key) in currentProject.images"
      :key="key"
      class="d-flex child-flex"
      cols="sm-6 xs-12"
    >
      <progect-image-item :image="image" />
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
import ProgectImageItem from "./ProgectImageItem";

export default {
  name: "ProjectImages",
  components: { ProgectImageItem },
  computed: {
    ...mapState(["currentProject"]),
  },
};
</script>

<style scoped lang="scss">
.imagesGrid {
  padding: 0 !important;
}
</style>
