import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
firebase.initializeApp({
  apiKey: "AIzaSyDVokxOUh9_lx3qZihrD84X0a5H08Gcl8Q",
  authDomain: "curtainggest.firebaseapp.com",
  projectId: "curtainggest",
  storageBucket: "curtainggest.appspot.com",
  messagingSenderId: "648489319780",
  appId: "1:648489319780:web:42030a392402c954f68e71",
  measurementId: "G-0SQ6ZW1RH9",
});

export default firebase;

export const db = firebase.firestore();
export const storageRef = firebase.storage().ref();
