/* eslint-disable @next/next/link-passhref */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '../lib/context.js';
import { auth } from '../lib/firebase.js';
import { signOut } from "firebase/auth";

export default function Navbar({ }) {
  const { user, username } = useContext(UserContext);
  const router = useRouter();

  const handleSignOut = () => {
    signOut(auth);
    router.push('/');
  };

  return (
    <nav className='navbar'>
      <div className='iruLogo'>
        <Link href='/'>
          <button className='btn-logo'>IRU</button>
        </Link>
      </div>
      <div className='webTitle'>
        <span>Robot Generator</span>
      </div>
      <div className='logButtons'>
      {username && (
          <>
            <Link href={`/user/${username}`}>
              <button className='btn-blue'>{username}</button>
            </Link>
            <button onClick={handleSignOut}>Sign Out</button>
          </>
        )}
        {!username && (
          <Link href='/login'>
            <button className='btn-blue'>Log in</button>
          </Link>
        )}
      </div>
    </nav>
  );
};