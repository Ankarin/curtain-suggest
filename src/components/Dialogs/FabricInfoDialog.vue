<template>
  <v-dialog
    :value="showDialog"
    @click:outside="closeDialog"
    max-width="600px"
    tile
  >
    <v-app-bar dark>
      <v-spacer></v-spacer>
      <v-btn icon @click="closeDialog">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-app-bar>
    <v-card flat tile>
      <v-carousel
        hide-delimiters
        height="380px"
        @change="onCarouselChange"
        :value="carouselValue"
      >
        <v-carousel-item
          v-for="(src, n) in fabricDetails.rendered_image_details"
          :key="n"
          :src="src"
          :position="carouselBackgroundPosition"
          @click="zoomImage(src)"
        ></v-carousel-item>
      </v-carousel>
      <v-row class="pl-8 pr-8 pt-3" dense>
        <v-col
          v-for="(src, n) in fabricDetails.rendered_image_details"
          cols="2"
          :key="n"
        >
          <v-card
            tile
            flat
            :elevation="n == carouselValue ? 3 : 0"
            @click="onCarouselChange(n)"
          >
            <v-img :src="src" height="70px">
              <template v-slot:placeholder>
                <v-row
                  style="background-color: #ddd"
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular indeterminate color="grey lighten-5">
                  </v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-card>
        </v-col>
      </v-row>

      <div class="pa-8" v-if="!$wait.is('loadingFabricDetails')">
        <h2 class="pb-3">{{ fabricDetails.name }}</h2>

        <table class="pb-6">
          <tr>
            <td>
              {{
                fabricTransparency[0].toUpperCase() +
                fabricTransparency.substring(1)
              }}
            </td>
            <td>{{ fabricType }}</td>
          </tr>
          <tr>
            <td>{{ widthType }}</td>
            <td>{{ fabricDetails.width }} cm</td>
          </tr>
          <tr>
            <td>Material</td>
            <td>
              <p class="ma-0" v-if="fabricDetails.ac">
                {{ fabricDetails.ac }}% acetate
              </p>
              <p class="ma-0" v-if="fabricDetails.co">
                {{ fabricDetails.co }}% katoen
              </p>
              <p class="ma-0" v-if="fabricDetails.div">
                {{ fabricDetails.div }}% other
              </p>
              <p class="ma-0" v-if="fabricDetails.li">
                {{ fabricDetails.li }}% linen
              </p>
              <p class="ma-0" v-if="fabricDetails.lrx">
                {{ fabricDetails.lrx }}% lurex
              </p>
              <p class="ma-0" v-if="fabricDetails.ma">
                {{ fabricDetails.ma }}% modacryl
              </p>
              <p class="ma-0" v-if="fabricDetails.pa">
                {{ fabricDetails.pa }}% polyester / nylon
              </p>
              <p class="ma-0" v-if="fabricDetails.ma">
                {{ fabricDetails.ma }}% modacryl
              </p>
              <p class="ma-0" v-if="fabricDetails.pe">
                {{ fabricDetails.pe }}% polyester
              </p>
              <p class="ma-0" v-if="fabricDetails.trcs">
                {{ fabricDetails.trcs }}% trevira CS
              </p>
              <p class="ma-0" v-if="fabricDetails.se">
                {{ fabricDetails.ac }}% silk
              </p>
              <p class="ma-0" v-if="fabricDetails.vi">
                {{ fabricDetails.vi }}% viscose
              </p>
              <p class="ma-0" v-if="fabricDetails.wol">
                {{ fabricDetails.wol }}% wool
              </p>
            </td>
          </tr>
          <tr>
            <td>Article</td>
            <td>{{ fabricDetails.article_number }}</td>
          </tr>
        </table>

        <p class="pb-2">
          {{ fabricDetails.plugin_fabric_memo }}
        </p>

        <p class="mb-2">Price per meter</p>
        <p class="price pb-2">
          {{ formatPrice[0] }}<sup>{{ formatPrice[1] }}</sup
          ><sup>*</sup>
        </p>
        <p class="text-caption pb-4">
          * Including comfort confection, single or butterfly pleat, 8cm fleece
          band, plastic adjustable hook, and 10cm bottom hem
        </p>

        <v-btn dark tile large @click="pickFabric()"> Get Sample </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { _ } from "vue-underscore";
export default {
  name: "FabricInfoDialog",
  props: {
    showDialog: Boolean,
    fabricDetails: Object,
  },
  watch: {
    showDialog: function () {
      this.carouselValue = "0";
    },
  },
  computed: {
    carouselBackgroundPosition() {
      if (this.$vuetify.breakpoint.xs) {
        return "center -15px";
      } else {
        return "0 -30px";
      }
    },
    formatPrice() {
      return [
        Math.trunc(this.fabricDetails.price_concept_pleat).toString(),
        Math.round((this.fabricDetails.price_concept_pleat % 1) * 100)
          .toString()
          .padStart(2, 0),
      ];
    },
    fabricType() {
      if (this.fabricDetails.type) {
        // return this.$t(`fabricType.${this.fabricDetails.type}`);
        return this.fabricDetails.type;
      }
      return "";
    },
    widthType() {
      if (this.fabricDetails.widthType) {
        // return this.$t(`widthType.${this.fabricDetails.widthType}`);
        return this.fabricDetails.widthType;
      }
      return "";
    },
    tags() {
      return (this.fabricDetails.tags || []).map((tag) => tag.id);
    },
    fabricTransparency() {
      const tagsMapping = [
        {
          id: [14, 15],
          name: "Transparent ",
        },
        {
          id: [16],
          name: "Translucent ",
        },
        {
          id: [17, 18],
          name: "Darkening ",
        },
      ];

      for (const tagMapping of tagsMapping) {
        if (_.union(this.tags, tagMapping.ids)) {
          return tagMapping.name;
        }
      }
      return "";
    },
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    pickFabric() {
      window.open("https://sampleservice.awsmonkey.nl/order", "_blank");
    },
    onCarouselChange(number) {
      this.carouselValue = number;
    },
    zoomImage(src) {
      // TODO make zoom component
      this.selectedImage = src;
    },
  },
  data() {
    return {
      selectedImage: null,
      carouselValue: "0",
    };
  },
};
</script>

<style>
td {
  vertical-align: baseline;
}
.row.washing-symbols {
  max-width: 250px;
}
p.price {
  font-size: 26px;
  line-height: 1em;
  font-weight: 800;
}
p.price sup {
  font-size: 15px;
  line-height: 1em;
  margin-left: 3px;
}
</style>
