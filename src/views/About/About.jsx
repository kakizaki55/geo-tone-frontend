import { aboutUs } from '../../../public/assets/aboutUs.js';
import githubLogo from '../../../public/assets/github.png';
import linkedInLogo from '../../../public/assets/linkedin.png';
import tetrahedron from '../../../public/assets/tetrahedron.png';
import diamond from '../../../public/assets/diamond.png';
import square from '../../../public/assets/square.png';
import triangle from '../../../public/assets/mobiusTriangle.png';
import styles from './About.css';

const About = () => {
  return (
    <section className={styles.aboutContainer}>
      {aboutUs.map((each) => (
        <article key={each.name} className={styles.aboutCard}>
          {(() => {
            switch (each.photo) {
              case 'tetrahedron':
                return <img src={tetrahedron} alt="Small shape icons" />;
              case 'diamond':
                return <img src={diamond} alt="Small shape icons" />;
              case 'square':
                return <img src={square} alt="Small shape icons" />;
              case 'triangle':
                return <img src={triangle} alt="Small shape icons" />;
              default:
                return 'neutral';
            }
          })()}
          <h2>{each.name}</h2>
          <p>{each.bio}</p>
          <div>
            <a href={each.gitHub} target="_blank">
              <img src={githubLogo} alt={`${each.name} at GitHub.com`} />
            </a>
            <a href={each.linkedIn} target="_blank">
              <img src={linkedInLogo} alt={`${each.name} at LinkedIn.com`} />
            </a>
          </div>
        </article>
      ))}
    </section>
  );
};

export default About;
