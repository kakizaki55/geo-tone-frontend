import React from 'react';
import styles from './Home.css';
import shapes from '../../assets/shapes.png';
import { NavLink } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <div className={styles.homeContainer}>
        <div className={styles.homeBanner}>
          <img src={shapes} />
          <h1>Welcome to GEO TONE.</h1>
          <img src={shapes} />
        </div>
        <p>
          An app that inspires creativity through an easy-to-use audio
          sequencer.
        </p>
        <p>
          Love music? Us, too! <NavLink to="/register">Sign up </NavLink>to
          play.
        </p>
      </div>
    </>
  );
}
