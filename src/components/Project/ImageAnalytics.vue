<template>
  <div style="width: 100%">
    <fabric-info-dialog
      :show-dialog="fabricInfoDialog"
      :fabric-details="fabricDetails"
      @closeDialog="fabricInfoDialog = false"
    />
    <div v-if="colors && avgColor" class="colorsGrid">
      <v-tooltip :key="key" v-for="(color, key) in colors" top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            @click="showInfo(suggestFabric(color.rgb))"
            style="margin: auto; margin-bottom: 5px"
            text
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-information</v-icon>
          </v-btn>
        </template>
        <span>Info</span>
      </v-tooltip>
    </div>
    <div v-if="colors && avgColor" class="colorsGrid">
      <template v-for="(color, key) in colors">
        <v-img
          :key="key"
          v-bind="attrs"
          v-on="on"
          @click="
            $emit('selectPreviewImage', suggestFabric(color.rgb).rendered_image)
          "
          style="cursor: pointer"
          :src="suggestFabric(color.rgb).rendered_image"
        >
        </v-img>
      </template>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import { fabrics } from "../../fabrics";
import { mapState } from "vuex";
import diff from "color-diff";
import axios from "axios";
import FabricInfoDialog from "../Dialogs/FabricInfoDialog";

export default {
  components: { FabricInfoDialog },
  props: {
    colors: {
      type: Array,
      default: () => [],
    },
    avgColor: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      fabricInfoDialog: false,
      fabricDetails: {},
    };
  },

  computed: {
    fabricColors() {
      return fabrics.map((fabric) => fabric.rgb);
    },
    ...mapState(["currentProject"]),
  },
  methods: {
    suggestFabric(color) {
      let closestColor = diff.closest(color, this.fabricColors);
      const fabricArr = [...fabrics];
      return fabricArr.find((fabric) => fabric.rgb === closestColor);
    },
    async showInfo(fabric) {
      window.open(
        `https://sampleservice.vadain.nl/order?q=${fabric.article_number}`,
        "_blank"
      );
    },
  },
};
</script>

<style scoped>
.colorsGrid {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 5px;
}
.color-card {
  height: 100px;
}
@media screen and (max-width: 1000px) {
  .color-card {
    height: 60px;
  }
  .colorsGrid {
    grid-gap: 2px;
  }
}
</style>
