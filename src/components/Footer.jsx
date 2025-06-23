import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.copyright}>
          <p>&copy; {new Date().getFullYear()} Digital Kafedri. Все права защищены.</p>
        </div>
        <div className={styles.links}>
          <a href='#'>О нас</a>
          <a href='#'>Контакты</a>
          <a href='#'>Политика конфиденциальности</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
