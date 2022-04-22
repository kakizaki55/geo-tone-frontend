import React, { useEffect, useState } from 'react';
import styles from './Home.css';
import shapes from '../../assets/shapes.png';
import { Link } from 'react-router-dom';
import { getTotalUsers, getTotalProjects } from '../../services/aggregate';

export default function Home() {
  const [totalProjects, setTotalProjects] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const projectAggregate = await getTotalProjects();
      setTotalProjects(projectAggregate);
      const userAggregate = await getTotalUsers();
      setTotalUsers(userAggregate);
    };
    fetchData();
  }, []);

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
          Love music? Us, too!{' '}
          <Link to="/register" className={styles.registerLink}>
            Sign up
          </Link>{' '}
          to play.
        </p>
        <p>
          Join the {totalUsers} other synth wizards who have created{' '}
          {totalProjects} projects!
        </p>
      </div>
    </>
  );
}
