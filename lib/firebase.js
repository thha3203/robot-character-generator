import { getApps, getApp, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD-XY5yEJm_DsHSiVlE7z2cmAA13WkOeJM",
  authDomain: "robot-character-generator.firebaseapp.com",
  projectId: "robot-character-generator",
  storageBucket: "robot-character-generator.appspot.com",
  messagingSenderId: "417134728120",
  appId: "1:417134728120:web:982dbe61529feb8e64b54d"
};

const firebase = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(firebase);
export const googleAuthProvider = new GoogleAuthProvider();
export const firestore = getFirestore(firebase);
export const storage = getStorage(firebase);