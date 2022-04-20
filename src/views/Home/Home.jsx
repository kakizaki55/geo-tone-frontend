import React from 'react';
import styles from './Home.css';
import shapes from '../../assets/shapes.png';
import { NavLink } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <div className={styles.homeContainer}>
        <div className={styles.homeBanner}>
          <img src={shapes} alt="Colorful squares" />
          <h1>Welcome to GEo TONe.</h1>
          <img src={shapes} alt="Colorful squares" />
        </div>
        <p>A browser-based audio sequencer, built with creativity in mind.</p>
        <p>
          Love music? Us, too! <NavLink to="/register">Sign up </NavLink>to
          play.
        </p>
      </div>
    </>
  );
}
