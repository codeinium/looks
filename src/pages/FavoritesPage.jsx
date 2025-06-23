import ProductCard from '../components/ProductCard';
import styles from './FavoritesPage.module.css';

const FavoritesPage = ({
  favoriteProducts,
  onToggleFavorite,
  onProductClick,
  addToCart,
  favorites,
}) => {
  return (
    <div className={styles.favoritesPage}>
      <h1 className={styles.title}>Избранное</h1>
      {favoriteProducts.length > 0 ? (
        <div className={styles.productList}>
          {favoriteProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onProductClick={onProductClick}
              onToggleFavorite={onToggleFavorite}
              addToCart={addToCart}
              isFavorite={favorites.includes(product.id)}
            />
          ))}
        </div>
      ) : (
        <p className={styles.emptyMessage}>
          Вы еще не добавили ничего в избранное.
        </p>
      )}
    </div>
  );
};

export default FavoritesPage; 