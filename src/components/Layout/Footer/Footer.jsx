import styles from './Footer.css';

export default function Footer() {
  return (
    <footer>
      <a target="_blank" href="https://github.com/kakizaki55/geo-tone-frontend">
        <img
          className={styles.github}
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png"
          alt="Geo Tone at GitHub"
        />
      </a>
    </footer>
  );
}
