import styles from './ProductCard.module.css';

const FavoriteIcon = ({ isFavorite }) => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill={isFavorite ? 'currentColor' : 'none'}
    stroke='currentColor'
    className={isFavorite ? styles.favoriteIconActive : styles.favoriteIcon}
  >
    <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'></path>
  </svg>
);

const ProductCard = ({
  product,
  addToCart,
  onProductClick,
  isFavorite,
  onToggleFavorite,
}) => {
  const handleAddToCartClick = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(product.id);
  };

  return (
    <div className={styles.card}>
      <div
        className={styles.imageContainer}
        onClick={() => onProductClick(product)}
      >
        <img src={product.image} alt={product.title} className={styles.image} />
        <button onClick={handleFavoriteClick} className={styles.favoriteButton}>
          <FavoriteIcon isFavorite={isFavorite} />
        </button>
      </div>
      <div className={styles.cardBody}>
        <h3
          className={styles.title}
          onClick={() => onProductClick(product)}
        >
          {product.title}
        </h3>
        <div className={styles.cardFooter}>
          <p className={styles.price}>${product.price.toFixed(2)}</p>
          <button onClick={handleAddToCartClick} className={styles.button}>
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
