import styles from './ProductDetails.module.css';

const FavoriteIcon = ({ isFavorite }) => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill={isFavorite ? 'currentColor' : 'none'}
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'></path>
  </svg>
);

const ProductDetails = ({
  product,
  onToggleFavorite,
  isFavorite,
  addToCart,
}) => {
  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className={styles.details}>
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.title} className={styles.image} />
      </div>
      <div className={styles.content}>
        <p className={styles.category}>{product.category}</p>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.footer}>
          <p className={styles.price}>${product.price.toFixed(2)}</p>
          <div className={styles.buttons}>
            <button
              onClick={() => onToggleFavorite(product.id)}
              className={styles.favoriteButton}
            >
              <FavoriteIcon isFavorite={isFavorite} />
            </button>
            <button onClick={handleAddToCart} className={styles.cartButton}>
              В корзину
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 