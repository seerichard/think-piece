// Importing the minimum required (not entire firebase)
import firebase from 'firebase/app';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: "AIzaSyCg-brMUTNPbCCYlJGDaNoHIWzYu0DLkvc",
  authDomain: "think-piece-3fab8.firebaseapp.com",
  projectId: "think-piece-3fab8",
  storageBucket: "think-piece-3fab8.appspot.com",
  messagingSenderId: "596767122240",
  appId: "1:596767122240:web:d07c5ffb45a6103fa050a5",
  measurementId: "G-V17V5W89EY"
};

firebase.initializeApp(config);

// Not exactly best practice, but great for debugging!
window.firebase = firebase;

export default firebase;