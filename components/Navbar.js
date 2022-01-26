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
      <span className='webTitle'>Robot Generator</span>
      <ul>
        <li>
          <Link href='/'>
            <button className='btn-logo'>IRU</button>
          </Link>
        </li>
        {username && (
          <li>
            <Link href={`/${username}`}>
            <button className='btn-blue'>{username}</button>
            </Link>
          </li>
        )}
        {!username && (
          <li>
            <Link href='/enter'>
              <button className='btn-blue'>Log in</button>
            </Link>
          </li>
        )}
      </ul>
      {username && (
        <button className='signout' onClick={handleSignOut}>Sign Out</button>
      )}
    </nav>
  );
};