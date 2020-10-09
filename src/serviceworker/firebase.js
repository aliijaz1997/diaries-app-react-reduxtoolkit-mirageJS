import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCG4tR2CCoGCIGUqjOTLZVU-K18-U9KHLQ",
    authDomain: "diaries-app-1a787.firebaseapp.com",
    databaseURL: "https://diaries-app-1a787.firebaseio.com",
    projectId: "diaries-app-1a787",
    storageBucket: "diaries-app-1a787.appspot.com",
    messagingSenderId: "263104993781",
    appId: "1:263104993781:web:aa3a52c96a81f774ab68bc",
    measurementId: "G-6KDK798MVM"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // firebase.analytics();
  export default firebase;