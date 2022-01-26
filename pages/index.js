/* eslint-disable @next/next/link-passhref */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import Loader from '../components/Loader.js';
import { useState } from 'react';
import Link from 'next/link';

export default function Home() {

  return (
    <main className='home'>
      <Link href='/generate'>
        <button className='generate'>Generate New Robot</button>
      </Link>
    </main>
  );
};
