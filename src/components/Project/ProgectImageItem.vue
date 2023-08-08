<template>
  <v-card>
    <div style="display: flex; justify-content: flex-end; margin-bottom: -5px">
      <delete-icon :id="image.refFullPath" type="image" />
    </div>

    <v-card-title id="imageAnalyticsWrapper"
      ><image-analytics
        @selectPreviewImage="selectPreviewImage"
        @addPreviewImage="addPreviewImage"
        :colors="image.colors"
        :avgColor="image.avgColor"
        :isAddPreviewButtons="images.length > 0"
      />
    </v-card-title>
    <v-img
      :src="image.src"
      height="400"
      :id="`imageId1`"
      class="grey lighten-2"
    >
      <div style="height: 400px; width: auto; position: relative">
        <vue-draggable-resizable
          :active="true"
          @activated="onActivated(image.id)"
          @deactivated="onDeactivated(image.id)"
          v-for="image in images"
          :key="image.id"
          :w="250"
          :h="250"
          @dragging="onDrag"
          @resizing="onResize"
          :parent="true"
          :style="{
            background: `url(${image.image}) no-repeat center`,
            backgroundSize: 'cover',
          }"
        >
          <v-btn
            v-if="image.activated"
            @click.stop="deleteItem(image.id)"
            class="ma-2 previewMenu"
            text
            icon
            color="error"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </vue-draggable-resizable>
      </div>
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
</template>

<script>
import Vue from "vue";
import VueDraggableResizable from "vue-draggable-resizable";
import "vue-draggable-resizable/dist/VueDraggableResizable.css";
import { v4 as uuidv4 } from "uuid";
Vue.component("vue-draggable-resizable", VueDraggableResizable);
import ImageAnalytics from "./ImageAnalytics";
import DeleteIcon from "../Buttons/DeleteIcon";
export default {
  props: {
    image: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    DeleteIcon,
    ImageAnalytics,
  },
  name: "ProgectImageItem",
  data: function () {
    return {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      images: [],
      activated: null,
    };
  },
  methods: {
    indexById(id) {
      return this.images.findIndex((image) => image.id === id);
    },
    selectPreviewImage(image) {
      this.activated && this.images.length > 0
        ? (this.images[this.indexById(this.activated)].image = image)
        : this.addPreviewImage(image);
    },
    addPreviewImage(image) {
      this.images.push({ image: image, activated: false, id: uuidv4() });
    },
    onActivated(id) {
      this.activated = id;
      this.images[this.indexById(id)].activated = true;
    },
    onDeactivated(id) {
      setTimeout(() => (this.activated = null), 100);
      this.images[this.indexById(id)].activated = false;
    },
    onResize: function (x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    },
    onDrag: function (x, y) {
      this.x = x;
      this.y = y;
    },
    deleteItem(id) {
      this.images.splice(this.indexById(id), 1);
    },
  },
};
</script>

<style scoped>
.previewMenu {
  position: absolute;
  right: 0;
  top: 0;
}
</style>
