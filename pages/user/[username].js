/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { auth, firestore } from '../../lib/firebase.js';
import { doc, getDoc, updateDoc, arrayRemove } from 'firebase/firestore';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../lib/context.js';
import { getIdToken } from 'firebase/auth';
import Image from 'next/image';


export async function getServerSideProps({ query }) {
  const { username } = query;
  const usernameDoc = doc(firestore, 'usernames', username);
  const userData = await getDoc(usernameDoc);
  if (userData.exists()) {
    const { photos } = userData.data();
    return {
      props: { username, photos }
    };
  } else {
    return {
      props: {
        username: 'invalid user',
        photos: []
      }
    };
  };
};

export default function UserProfilePage({ username, photos }) {
  const [photosState, setPhotosState] = useState(photos);
  const currentUser = useContext(UserContext).username;
  const photosRef = doc(firestore, 'usernames', username);

  const handleDelete = async (event) => {
    let index = event.target.id;
    let updated = photosState;
    let deleted = updated.splice(index, 1);
    try {
      await updateDoc(photosRef, {
        photos: arrayRemove(deleted[0])
      })
    } catch (error) {
      console.log('ERROR DELETING', error);
    };
    setPhotosState( (curState) => {
      return [...updated];
    });
  };

  useEffect( () => {
    setPhotosState((curState) => {
      return [...photos];
    });
    return () => {
      setPhotosState([]);
    };
  }, [username]);

  return (
    <div className='userProfile'>
      <h2 className='username'>@{username}</h2>
      {photosState.length > 0 && (
        <div className='userPhotos'>
          {photosState.map((photo, index) => {
            return <div key={index} className='userPhoto'>
              {username === currentUser && (
                <span className='delete' onClick={handleDelete} id={index}>X</span>
              )}
              <Image src={photo} alt='robot' width='190px' height='200px' />
            </div>
          })}
        </div>
      )}
    </div>
  );
};
