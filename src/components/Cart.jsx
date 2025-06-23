import styles from './Cart.module.css';

const TrashIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='20'
    height='20'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <polyline points='3 6 5 6 21 6'></polyline>
    <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'></path>
    <line x1='10' y1='11' x2='10' y2='17'></line>
    <line x1='14' y1='11' x2='14' y2='17'></line>
  </svg>
);

const Cart = ({ items, onClose, onRemove, onCheckout }) => {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Корзина</h2>
          <button onClick={onClose} className={styles.closeButton}>
            &times;
          </button>
        </div>
        <div className={styles.cartItems}>
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.itemImage}
                />
                <div className={styles.itemDetails}>
                  <h4 className={styles.itemTitle}>{item.title}</h4>
                  <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => onRemove(item.id)}
                  className={styles.removeButton}
                >
                  &times;
                </button>
              </div>
            ))
          ) : (
            <p>Ваша корзина пуста.</p>
          )}
        </div>
        {items.length > 0 && (
          <div className={styles.cartTotal}>
            <div className={styles.totalRow}>
              <span>Итого</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button onClick={onCheckout} className={styles.checkoutButton}>
              Оформить заказ
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
