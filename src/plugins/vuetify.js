import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#49817B",
        secondary: "#B8860B",
        accent: "#FF5945",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
        //Buttons
        primaryButton: "#9F6652",
        secondaryButton: "#C4C4C4",
        actionButton: "#41695b",
        outlinedButton: "#ffffff",
      },
    },
  },
});
