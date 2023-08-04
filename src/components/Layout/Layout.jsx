import Header from './Header/Header.jsx';
import Footer from './Footer/Footer.jsx';
import styles from './Layout.css';

export default function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
