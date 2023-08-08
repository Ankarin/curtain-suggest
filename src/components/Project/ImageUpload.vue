<template>
  <div>
    <v-file-input
      @change="uploadFiles"
      chips
      style="width: 100%"
      v-model="images"
      multiple
      label="Upload photos of your room"
    ></v-file-input>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ImageUpload",
  data() {
    return {
      images: [],
    };
  },
  methods: {
    uploadFiles() {
      if (this.images.length > 0) {
        this.$wait.start("loading");
        this.uploadPhotos({
          images: this.images,
          returnStatus: this.returnUploadState,
        });
      }
    },
    returnUploadState(state) {
      this.images = [];
      state === "error"
        ? alert("Sorry, something went wrong")
        : state === "success"
        ? this.$wait.end("loading")
        : "";
    },
    ...mapActions(["uploadPhotos"]),
  },
  computed: {
    isUploadingPhotos() {
      return this.$wait.is("loading");
    },
  },
};
</script>

<style scoped></style>
