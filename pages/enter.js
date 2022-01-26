/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { auth, firestore } from '../lib/firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { UserContext } from '../lib/context.js';
import { useState, useContext, useCallback, useEffect } from 'react';
import { doc, getDoc, writeBatch } from 'firebase/firestore';
import debounce from 'lodash.debounce';

export default function Enter(props) {
  const { user, username } = useContext(UserContext);

  return (
    <main>
      {user ?
        !username ? <UsernameForm /> : <SignOutButton />
        :
        <SignUp />
      }
    </main>
  );
};

function SignUp() {
  const [error, setError] = useState(false);
  const signUpWithEmail = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error.message);
    };
  };
  const signInWithEmail = async (event) => {
    event.preventDefault();
    const email = event.target.parentElement.email.value;
    const password = event.target.parentElement.password.value;
    signInWithEmailAndPassword(auth, email, password)
      .catch(err => {
        setError(true);
      });
  };
  return (
    <form onSubmit={signUpWithEmail}>
      <label>Email</label>
      <input type='email' name='email' required></input>
      <label>Password</label>
      <input type='password' name='password' required></input>
      {error &&
        <p className='text-danger'>Invalid Username/Password</p>
      }
      <button className='signup' type='submit'>
        Sign Up
      </button>
      <button className='signin' onClick={signInWithEmail}>
        Sign In
      </button>
    </form>
  );
};

function SignOutButton() {
  const signOutGoogle = () => {
    signOut(auth);
  };
  return (
    <button onClick={signOutGoogle}>
      Sign Out
    </button>
  );
};

function UsernameForm() {
  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  const handleChange = (event) => {
    const val = event.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    };

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    };
  };

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const docRef = doc(firestore, 'usernames', username);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          setIsValid(true);
          setLoading(false);
        } else {
          setIsValid(false);
          setLoading(false);
        };
      };
    }, 500), []
  );

  useEffect( () => {
    checkUsername(formValue);
  }, [formValue]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userDoc = doc(firestore, 'users', user.uid);
    const usernameDoc = doc(firestore, 'usernames', formValue);
    const batch = writeBatch(firestore);
    batch.set(userDoc, { username: formValue });
    batch.set(usernameDoc, { uid: user.uid });
    await batch.commit();
  }

  return (
    !username && (
      <section>
        <h3>Choose Username</h3>
        <form onSubmit={handleSubmit}>
          <input name='username' placeholder='username' value={formValue} onChange={handleChange} />
          <UsernameMessage username={formValue} isValid={isValid} loading={loading}/>
          <button type='submit' className='btn-green' disabled={!isValid}>
            Choose
          </button>
        </form>
      </section>
    )
  );
};

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p>Checking...</p>
  } else if (isValid) {
    return <p className='text-success'>{username} is available</p>;
  } else if (username && !isValid) {
    return <p className='text-danger'>{username} is taken!</p>
  } else {
    return <p></p>
  };
};