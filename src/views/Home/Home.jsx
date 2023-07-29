import shapes from '../../../public/assets/shapes.png';
import styles from './Home.css';

export default function Home() {
  return (
    <>
      <section className={styles.homeContainer}>
        <div className={styles.homeBanner}>
          <img src={shapes} alt="Colorful squares" />
          <h1>Welcome to GEo TONe.</h1>
          <img src={shapes} alt="Colorful squares" />
        </div>
        <p>A browser-based audio sequencer, built with creativity in mind.</p>
      </section>
    </>
  );
}
