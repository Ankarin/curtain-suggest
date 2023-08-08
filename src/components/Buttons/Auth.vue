<template>
  <div class="auth">
    <div class="pc-size">
      <h1 v-if="user" class="userName">{{ user.name }}</h1>

      <v-btn @click="login" class="primary" v-if="!user">Login</v-btn>
      <v-btn @click="logout" class="accent" v-else>Log Out</v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import firebase from "@/firebase";
let provider = new firebase.auth.GoogleAuthProvider();
const db = firebase.firestore();

export default {
  name: "Auth",
  data() {
    return {};
  },
  computed: {
    ...mapState(["user"]),
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setUser(user);
      } else {
        this.login();
        this.setUser();
      }
    });
  },
  methods: {
    createNewUserDoc(user) {
      db.collection("users")
        .doc(user.uid)
        .set({ uid: user.uid, name: user.displayName, projects: [] });
    },
    login() {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          if (result.additionalUserInfo.isNewUser) {
            this.createNewUserDoc(result.user);
          }
          /** @type {firebase.auth.OAuthCredential} */
          // ...
        })
        .catch((error) => {
          console.log(error);
        });
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(
          function () {
            console.log("logOut");
          },
          function (error) {
            console.log(error);
          }
        );
    },
    ...mapActions(["setUser"]),
  },
};
</script>

<style scoped lang="scss">
.auth,
.pc-size {
  display: flex;
  flex-direction: row;
  align-items: center;
  .userName {
    padding-right: 20px;
  }
}

@media screen and (max-width: 700px) {
  .pc-size {
    h1 {
      font-weight: normal;
      font-size: 20px;
    }
  }
}
@media screen and (max-width: 500px) {
  .pc-size {
    h1 {
      font-size: 16px;
      font-weight: normal;
    }
  }
}
</style>
