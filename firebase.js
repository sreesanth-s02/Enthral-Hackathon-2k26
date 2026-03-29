const firebaseConfig = {
    apiKey: "AIzaSyCj75d-S7Rzqb8J3jxr1tfTc-fA2wMHa48",
    authDomain: "entral-hackathon.firebaseapp.com",
    projectId: "entral-hackathon",
    storageBucket: "entral-hackathon.firebasestorage.app",
    messagingSenderId: "568433559905",
    appId: "1:568433559905:web:50daacfdc09f20646fdd20",
    measurementId: "G-2MJZSFQ2B4"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
var db = firebase.firestore();