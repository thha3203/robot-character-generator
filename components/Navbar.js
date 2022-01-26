/* eslint-disable @next/next/link-passhref */
import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../lib/context.js';
import { auth } from '../lib/firebase.js';
import { signOut } from "firebase/auth";

export default function Navbar({ }) {
  const { user, username } = useContext(UserContext);

  const handleSignOut = () => {
    signOut(auth);
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
            <Link href={`/${username}`}>
              <button className='btn-blue'>{username}</button>
            </Link>
            <button onClick={handleSignOut}>Sign Out</button>
          </>
        )}
        {!username && (
          <Link href='/enter'>
            <button className='btn-blue'>Log in</button>
          </Link>
        )}
      </div>
    </nav>
  );
};