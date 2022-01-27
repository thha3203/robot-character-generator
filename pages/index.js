/* eslint-disable @next/next/link-passhref */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import Loader from '../components/Loader.js';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [previews, setPreviews] = useState([]);

  useEffect( () => {
    let photos = [];
    for (let i = 1; i < 22; i++) {
      let image = `preview${i}`;
      photos.push(image);
    };
    setPreviews( (curState) => {
      return [...photos];
    });
  }, []);

  return (
    <main className='home'>
      {previews.length > 0 && (
        <div className='userPhotos'>
          {previews.map((photo, index) => {
            return <div key={index} className='userPhoto'>
              <Image src={`/previews/${photo}.png`} alt='robot' width='200px' height='225px' />
            </div>
          })}
        </div>
      )}
    </main>
  );
};
