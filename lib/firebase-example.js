import { getApps, getApp, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // Your firebase config here
};

const firebase = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(firebase);
export const googleAuthProvider = new GoogleAuthProvider();
export const firestore = getFirestore(firebase);
export const storage = getStorage(firebase);