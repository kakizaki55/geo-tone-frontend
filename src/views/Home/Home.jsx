import { NavLink } from 'react-router-dom';
import shapes from '../../../public/assets/shapes.png';
import styles from './Home.css';

const Home = () => {
  return (
    <section className={styles.section}>
      <div className={styles.homeBanner}>
        <img src={shapes} alt="" />
        <h1>Welcome to GEo TONe.</h1>
        <img src={shapes} alt="" />
      </div>
      <p>A browser-based audio sequencer, built with creativity in mind.</p>
      <NavLink to="/create" className={styles.navButton}>
        <button>crEaTE</button>
      </NavLink>
    </section>
  );
};

export default Home;
