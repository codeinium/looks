import styles from './Modal.module.css';

const Modal = ({ onClose, children, size, title }) => {
  const modalClass =
    size === 'small' ? `${styles.modal} ${styles.modalSmall}` : styles.modal;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={modalClass} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>{title}</h3>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
