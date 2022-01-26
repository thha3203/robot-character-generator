import { auth, firestore } from './firebase.js';
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, doc, onSnapshot, setDoc, getDocs } from "firebase/firestore";

export function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);
  useEffect( () => {
    let unsubscribe;
    if (user) {
      const docRef = doc(firestore, 'users', user.uid);
      unsubscribe = onSnapshot(docRef, (doc) => {
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    };
    return unsubscribe;
  }, [user]);

  return { user, username };
};