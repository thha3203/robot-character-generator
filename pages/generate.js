/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import Loader from '../components/Loader.js';
import { auth, storage } from '../lib/firebase.js';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import domToImage from 'dom-to-image';

export default function Generate() {
  const imageDiv = useRef(null);
  const [downloadURL, setDownloadURL] = useState(null);
  const router = useRouter();

  const [robot, setRobot] = useState({
    head: null,
    cap: null,
    earLeft: null,
    earRight: null,
    eyes: null,
    mouth: null,
    neck: null,
    body: null,
    bodyItem: null,
    armLeft: null,
    armRight: null,
    legLeft: null,
    legRight: null,
    oneLegged: null
  });


  const handleImage = (event) => {
    if (auth.currentUser) {
      const imageName = Date.now();
      const node = imageDiv.current;
      const scale = 4;
      const style = {
          transform: 'scale('+scale+')',
          transformOrigin: 'top left',
          width: node.offsetWidth + "px",
          height: node.offsetHeight + "px"
      }
      const param = {
          height: node.offsetHeight * scale,
          width: node.offsetWidth * scale,
          quality: 1,
          style
      }

      domToImage.toPng(node, param)
        .then(dataUrl => {
          const storageRef = ref(storage, `uploads/${auth.currentUser.uid}/${imageName}.png`);
          return uploadString(storageRef, dataUrl, 'data_url');
        })
        .then(snapshot => {
          const pathRef = ref(storage, `uploads/${auth.currentUser.uid}/${imageName}.png`);
          return getDownloadURL(pathRef);
        })
        .then(url => {
          setDownloadURL(url);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      router.push('/enter');
    };
  };

  const generate = () => {
    let robot = {};
    let oneLegged = Math.floor(Math.random() * 1337);
    if (oneLegged % 2 === 0) {
      robot = {
        head: Math.floor(Math.random() * 6) + 1,
        cap: Math.floor(Math.random() * 5),
        earLeft: Math.floor(Math.random() * 3),
        earRight: Math.floor(Math.random() * 3),
        eyes: Math.floor(Math.random() * 25) + 1,
        mouth: Math.floor(Math.random() * 13) + 1,
        neck: Math.floor(Math.random() * 3) + 1,
        body: Math.floor(Math.random() * 6) + 1,
        bodyItem: Math.floor(Math.random() * 19),
        armLeft: Math.floor(Math.random() * 11) + 1,
        armRight: Math.floor(Math.random() * 10) + 1,
        legLeft: Math.floor(Math.random() * 5) + 1,
        legRight: Math.floor(Math.random() * 5) + 1,
        oneLegged: null
      };
    } else {
      robot = {
        head: Math.floor(Math.random() * 6) + 1,
        cap: Math.floor(Math.random() * 5),
        earLeft: Math.floor(Math.random() * 3),
        earRight: Math.floor(Math.random() * 3),
        eyes: Math.floor(Math.random() * 25) + 1,
        mouth: Math.floor(Math.random() * 13) + 1,
        neck: Math.floor(Math.random() * 3) + 1,
        body: Math.floor(Math.random() * 6) + 1,
        bodyItem: Math.floor(Math.random() * 19),
        armLeft: Math.floor(Math.random() * 11) + 1,
        armRight: Math.floor(Math.random() * 10) + 1,
        legLeft: null,
        legRight: null,
        oneLegged: Math.floor(Math.random() * 8) + 1
      };
    }
    setRobot( (curState) => {
      return robot;
    });
  };

  return (
    <main className='home'>
      <button onClick={generate} className='generate'>Generate</button>
      {robot.head && (
        <>
        <div className='robotContainer' ref={imageDiv}>
          <div className='topMargin'></div>
          <div className='robotHead'>
            <div className='leftEar'>
              {robot.earLeft !== 0 && (
                <img src={`/ears/earLeft/Robots_Item_${robot.earLeft}.png`} className={`earLeft${robot.earLeft}`}></img>
              )}
            </div>
            <div className='insideHead'>
              {robot.cap !== 0 && (
                <img src={`/cap/Robots_Item_${robot.cap}.png`} className='cap'></img>
              )}
              <img src={`/heads/Robots_Head_${robot.head}.png`} className='head'></img>
              <img src={`/eyes/Robots_Eyes_${robot.eyes}.png`} className='eyes'></img>
              <img src={`/mouths/Robots_Mouth_${robot.mouth}.png`} className='mouth'></img>
            </div>
            <div className='rightEar'>
              {robot.earRight !== 0 && (
                <img src={`/ears/earRight/Robots_Item_${robot.earRight}.png`} className={`earRight${robot.earRight}`}></img>
              )}
            </div>
          </div>
          <div className='robotBody'>
            <div className='armLeft'>
              <img src={`/armLeft/Robots_Arm_${robot.armLeft}.png`} ></img>
            </div>
            <div className='rBody'>
              <img src={`/body/Robots_Full_Body_${robot.body}.png`} className='body'></img>
              {robot.bodyItem !== 0 && (
                <img src={`/bodyItems/Robots_Item_${robot.bodyItem}.png`} className='bodyItem'></img>
              )}
            </div>
            <div className='armRight'>
              <img src={`/armRight/Robots_Arm_${robot.armRight}.png`} ></img>
            </div>
          </div>
          {robot.oneLegged
            ? <div className='oneLegged'>
                <img src={`/legs/Robots_Leg_${robot.oneLegged}.png`}></img>
              </div>
            : <div className='robotLegs'>
                <div className='legLeft'>
                  <img src={`/legLeft/Robots_Leg_${robot.legLeft}.png`} ></img>
                </div>
                <div className='legRight'>
                  <img src={`/legRight/Robots_Leg_${robot.legRight}.png`} ></img>
                </div>
              </div>
          }
        </div>
        <button className='btn-green addButton' onClick={handleImage}>Add Robot</button>
        </>
      )}
    </main>
  );
};
