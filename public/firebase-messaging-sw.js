importScripts('https://www.gstatic.com/firebasejs/7.23.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/7.23.0/firebase-messaging.js')


firebase.initializeApp({
    apiKey: "AIzaSyCG4tR2CCoGCIGUqjOTLZVU-K18-U9KHLQ",
    authDomain: "diaries-app-1a787.firebaseapp.com",
    databaseURL: "https://diaries-app-1a787.firebaseio.com",
    projectId: "diaries-app-1a787",
    storageBucket: "diaries-app-1a787.appspot.com",
    messagingSenderId: "263104993781",
    appId: "1:263104993781:web:aa3a52c96a81f774ab68bc",
    measurementId: "G-6KDK798MVM"
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./firebase-messaging-sw.js')
      .then(function(registration) {
        console.log('Registration successful, scope is:', registration.scope);
      }).catch(function(err) {
        console.log('Service worker registration failed, error:', err);
      });
    }
  firebase.messaging();