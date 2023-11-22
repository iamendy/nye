import styles from "../styles/Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footerSection}>
      <div className={styles.copy}>
        <span>&copy; Toronet X Techfiesta 2023.</span>
      </div>
    </footer>
  );
};

export default Footer;
