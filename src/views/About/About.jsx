import React from 'react';
import styles from './About.css';
import { aboutUs } from '../../assets/aboutUs.js';
import githubLogo from '../../assets/github.png';
import linkedInLogo from '../../assets/linkedin.png';

export default function About() {
  return (
    <div className={styles.aboutContainer}>
      {aboutUs.map((each) => (
        <div key={each.name} className={styles.aboutCard}>
          <img src={each.photo} alt="Small shape icons" />
          <h2>{each.name}</h2>
          <span>{each.bio}</span>
          <div>
            <a href={each.gitHub} target="_blank">
              <img src={githubLogo} alt="Small icon for GitHub" />
            </a>
            <a href={each.linkedIn} target="_blank">
              <img src={linkedInLogo} alt="Small icon for LinkedIn" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
