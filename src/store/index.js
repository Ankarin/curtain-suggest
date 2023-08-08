import Vue from "vue";
import Vuex from "vuex";
import { db, storageRef } from "@/firebase";
import { v4 as uuidv4 } from "uuid";
import * as Vibrant from "node-vibrant";
Vue.use(Vuex);

/* eslint-disable no-new */

const projectIndexFinder = (projects, id) => {
  return projects.indexOf(projects.find((project) => project.id === id));
};

const updatePreview = async (preview, state) => {
  try {
    const projects = state.projects;
    const currentProject = state.currentProject;
    let current = projects.find(
      (project) => project.id === currentProject.docId
    );
    const index = projects.indexOf(current);
    projects[index].preview = preview;
    db.collection("users").doc(state.user.uid).update({ projects: projects });
  } catch (err) {
    console.log(err);
  }
};
const updateProjectsInUserDoc = (docId, projects) => {
  db.collection("users").doc(docId).update({ projects });
};

const store = new Vuex.Store({
  state: {
    user: null,
    projects: [],
    currentProject: null,
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    deleteImage({ commit, state }, fullPath) {
      //prepare new images arr for update
      const images = [...state.currentProject.images];
      const key = images.indexOf(
        images.find((image) => image.refFullPath === fullPath)
      );
      images.splice(key, 1);

      try {
        //updatePreview
        const preview = images.length > 0 ? images[0] : "";
        updatePreview(preview, state);

        //delete image link in project doc
        const docId = state.currentProject.docId;
        db.collection("projects").doc(docId).update({ images });

        //delete image from bucket

        storageRef.child(fullPath).delete();
      } catch (err) {
        console.log(err);
      }
    },
    // eslint-disable-next-line no-unused-vars
    async deleteProject({ commit, state }, id) {
      const projects = [...state.projects];
      const key = projectIndexFinder(projects, id);
      projects.splice(key, 1);
      try {
        updateProjectsInUserDoc(state.user.uid, projects);
        db.collection("projects").doc(id).delete();
        const listImages = await storageRef.child(id).listAll();
        listImages.items.map((item) => item.delete());
      } catch (err) {
        console.log(err);
      }
    },
    setUser({ commit }, user) {
      if (user) {
        try {
          db.collection("users")
            .doc(user.uid)
            .onSnapshot((snap) => {
              commit("setUser", snap.data());
            });
        } catch (err) {
          console.log(err);
          commit("setUser", null);
        }
      } else {
        commit("setUser", null);
      }
    },

    // eslint-disable-next-line no-unused-vars
    async createNewProject({ commit, state }) {
      //add project to User's project list
      const projects = state.projects;
      const name = `New project ${projects.length + 1}`;
      const addToUserProjectList = async (id) => {
        try {
          projects.push({ id: id, name });
          await updateProjectsInUserDoc(state.user.uid, projects);
        } catch (err) {
          console.log(err);
        }
      };
      //create projectDoc
      try {
        const doc = db.collection("projects").doc();
        await doc.set({ docId: doc.id, name, images: [] });
        await addToUserProjectList(doc.id);
        return doc.id;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    getCurrentProject({ commit }, id) {
      db.collection("projects")
        .doc(id)
        .onSnapshot((snap) => {
          commit("setCurrentProject", snap.data());
        });
    },
    // eslint-disable-next-line no-unused-vars
    async uploadPhotos({ commit, state }, { images, returnStatus }) {
      const newImages = [];
      try {
        images.map((file) => {
          const name = file.name;
          const ref = storageRef
            .child(state.currentProject.docId)
            .child(`${uuidv4()}-${name}`);
          let uploadTask = ref.put(file);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              // eslint-disable-next-line no-unused-vars
              var progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(progress);
            },
            (error) => {
              returnStatus("error");
              console.log(error);
            },
            () => {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              uploadTask.snapshot.ref
                .getDownloadURL()
                .then(async (downloadURL) => {
                  const palette = await Vibrant.from(downloadURL).getPalette();
                  const colors = Object.keys(palette).map((item) => {
                    return {
                      name: item,
                      rgb: {
                        r: palette[item].r,
                        g: palette[item].g,
                        b: palette[item].b,
                      },
                    };
                  });
                  newImages.push({
                    src: downloadURL,
                    refFullPath: ref.fullPath,
                    colors,
                  });
                  newImages.length === images.length &&
                    updateProject(newImages);
                });
            }
          );
        });
      } catch (err) {
        console.log(err);
      }

      const updateProject = async (newArr) => {
        const preview = newArr[0];
        const imagesArr = state.currentProject.images;
        const arr = [...newArr, ...imagesArr];
        try {
          await db
            .collection("projects")
            .doc(state.currentProject.docId)
            .update({ images: arr });
          await updatePreview(preview, state);
          returnStatus("success");
        } catch (err) {
          console.log(err);
        }
      };
    },
    // eslint-disable-next-line no-unused-vars
    async changeProjectName({ commit, state }, newName) {
      const projectId = state.currentProject.docId;
      const projects = state.projects;
      const index = projectIndexFinder(projects, projectId);
      const newProjects = [...projects];
      newProjects[index].name = newName;
      try {
        updateProjectsInUserDoc(state.user.uid, newProjects);
        db.collection("projects").doc(projectId).update({ name: newName });
      } catch (err) {
        console.log(err);
      }
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      if (user) {
        state.projects = user.projects;
      } else {
        state.projects = [];
      }
    },
    setCurrentProject(state, project) {
      state.currentProject = project;
    },
  },
});

export default store;
