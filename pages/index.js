/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import styles from '../styles/Home.module.css';
import Loader from '../components/Loader.js';
import { useState } from 'react';

export default function Home() {
  const [robot, setRobot] = useState({
    head: null,
    neck: null,
    body: null,
    armLeft: null,
    armRight: null,
    legLeft: null,
    legRight: null,
    oneLegged: null
  });

  const generate = () => {
    let robot = {};
    let oneLegged = Math.floor(Math.random() * 1337);
    if (oneLegged % 2 === 0) {
      robot = {
        head: Math.floor(Math.random() * 6) + 1,
        neck: Math.floor(Math.random() * 3) + 1,
        body: Math.floor(Math.random() * 6) + 1,
        armLeft: Math.floor(Math.random() * 11) + 1,
        armRight: Math.floor(Math.random() * 10) + 1,
        legLeft: Math.floor(Math.random() * 5) + 1,
        legRight: Math.floor(Math.random() * 5) + 1,
        oneLegged: null
      };
    } else {
      robot = {
        head: Math.floor(Math.random() * 6) + 1,
        neck: Math.floor(Math.random() * 3) + 1,
        body: Math.floor(Math.random() * 6) + 1,
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
        <div className='robotContainer'>
          <div className='robotHead'>
            <img src={`/heads/Robots_Head_${robot.head}.png`} className='head'></img>
          </div>
          <div className='robotBody'>
            <div className='armLeft'>
              <img src={`/armLeft/Robots_Arm_${robot.armLeft}.png`} ></img>
            </div>
            <div className='rBody'>
              <img src={`/body/Robots_Full_Body_${robot.body}.png`} className='body'></img>
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
      )}
    </main>
  );
};
