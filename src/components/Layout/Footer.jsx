import { NavLink } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <NavLink to="/about">About Us</NavLink>
      <a href="https://github.com/geo-tone">
        <img
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png"
          alt="Geo Tone at GitHub.com"
        />
      </a>
    </footer>
  );
}
