import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { useState } from 'react';

const CartIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <circle cx='9' cy='21' r='1'></circle>
    <circle cx='20' cy='21' r='1'></circle>
    <path d='M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6'></path>
  </svg>
);

const ProfileIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'></path>
    <circle cx='12' cy='7' r='4'></circle>
  </svg>
);

const FavoriteIconHeader = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const BurgerIcon = () => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <line x1='3' y1='12' x2='21' y2='12'></line>
    <line x1='3' y1='6' x2='21' y2='6'></line>
    <line x1='3' y1='18' x2='21' y2='18'></line>
  </svg>
);

const CloseIcon = () => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <line x1='18' y1='6' x2='6' y2='18'></line>
    <line x1='6' y1='6' x2='18' y2='18'></line>
  </svg>
);

const Header = ({
  categories,
  onSelectCategory,
  selectedCategory,
  openCartModal,
  cartItemCount,
  isLoggedIn,
  openLoginModal,
}) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCategoryClick = (category) => {
    onSelectCategory(category);
    navigate('/');
    setIsMenuOpen(false); // Close menu on navigation
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to='/'>
          Digital <strong>Kafedri</strong>
        </Link>
      </div>

      <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
        <a
          href='#'
          onClick={(e) => {
            e.preventDefault();
            handleCategoryClick(null);
          }}
          className={selectedCategory === null ? styles.active : ''}
        >
          Все товары
        </a>
        {categories.map((category) => (
          <a
            key={category}
            href='#'
            onClick={(e) => {
              e.preventDefault();
              handleCategoryClick(category);
            }}
            className={selectedCategory === category ? styles.active : ''}
          >
            {category}
          </a>
        ))}
      </nav>
      <div className={styles.buttons}>
        <button className={styles.cartButton} onClick={openCartModal}>
          <CartIcon />
          {cartItemCount > 0 && (
            <span className={styles.cartCount}>{cartItemCount}</span>
          )}
        </button>
        {isLoggedIn ? (
          <>
            <Link to='/favorites' className={styles.iconButton}>
              <FavoriteIconHeader />
            </Link>
            <Link to='/profile' className={styles.iconButton}>
              <ProfileIcon />
            </Link>
          </>
        ) : (
          <button onClick={openLoginModal} className={styles.loginButton}>
            Войти
          </button>
        )}
      </div>
      <button
        className={styles.burgerButton}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <CloseIcon /> : <BurgerIcon />}
      </button>
    </header>
  );
};

export default Header;
