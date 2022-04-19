import React from 'react';
import styles from './About.css';
import { aboutUs } from '../../assets/aboutUs.js';
import githubLogo from '../../assets/github.png';
import linkedInLogo from '../../assets/linkedin.png';

export default function About() {
  console.log('aboutUs', aboutUs);
  return (
    <div className={styles.aboutContainer}>
      {aboutUs.map((each) => (
        <div key={each.name} className={styles.aboutCard}>
          <img src={each.photo} />
          <h2>{each.name}</h2>
          <span>{each.bio}</span>
          <div>
            <a href={each.gitHub}>
              <img src={githubLogo} />
            </a>
            <a href={each.linkedIn}>
              <img src={linkedInLogo} />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
