import ProductList from '../components/ProductList';
import styles from './HomePage.module.css';

const HomePage = ({
  products,
  loading,
  error,
  addToCart,
  onProductClick,
  favorites,
  onToggleFavorite,
}) => {
  return (
    <div className={styles.homePage}>
      {loading && <p>Загрузка товаров...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && !error && (
        <ProductList
          products={products}
          addToCart={addToCart}
          onProductClick={onProductClick}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
      )}
    </div>
  );
};

export default HomePage;
