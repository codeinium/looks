import ProductCard from './ProductCard';
import styles from './ProductList.module.css';

const ProductList = ({
  products,
  addToCart,
  onProductClick,
  favorites,
  onToggleFavorite,
}) => {
  return (
    <div className={styles.productList}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          addToCart={addToCart}
          onProductClick={onProductClick}
          isFavorite={favorites.includes(product.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default ProductList;
