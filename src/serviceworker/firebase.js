import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCG4tR2CCoGCIGUqjOTLZVU-K18-U9KHLQ",
    authDomain: "diaries-app-1a787.firebaseapp.com",
    databaseURL: "https://diaries-app-1a787.firebaseio.com",
    projectId: "diaries-app-1a787",
    storageBucket: "diaries-app-1a787.appspot.com",
    messagingSenderId: "263104993781",
    appId: "1:263104993781:web:aa3a52c96a81f774ab68bc",
    measurementId: "G-6KDK798MVM"
  };

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("sw.js") // service worker file location
      .then(function() {
        console.log("Service Worker Registered Successfully");
      })
      .catch(function(error) {
        console.error("Something goes wrong while registering service worker");
        console.log(error);
      });
  } else {
    console.log("Service Worker is not available");
  }
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // firebase.analytics();
  export default firebase;