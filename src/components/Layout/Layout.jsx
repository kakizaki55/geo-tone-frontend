import React from 'react';
import Footer from './Footer';
import Header from './Header';
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
