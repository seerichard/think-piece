// Importing the minimum required (not entire firebase)
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

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

export const firestore = firebase.firestore();
export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const signOut = () => auth.signOut();

// Not exactly best practice, but great for debugging!
window.firebase = firebase;

export const createUserProfileDocument = async (user, additionalData) => {
  // If user signs out, user will be null
  if (!user) return;

  // Get a reference to the place in the database where a user profile might be
  const userReference = firestore.doc(`users/${user.uid}`);

  // Fetch teh document from that location
  const snapshot = await userReference.get();

  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();

    try {
      await userReference.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }
}

export default firebase;