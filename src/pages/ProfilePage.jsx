import { useNavigate } from 'react-router-dom';
import styles from './ProfilePage.module.css';
import { useState } from 'react';

const ProfilePage = ({ user, onLogout, orders, onUpdateUser }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(user?.name || '');

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleNameUpdate = () => {
    setIsEditing(false);
    // Только обновляем, если имя действительно изменилось
    if (user.name !== userName) {
      onUpdateUser({ ...user, name: userName });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      handleNameUpdate();
      e.target.blur(); // Снимаем фокус с инпута
    }
  };

  if (!user) {
    return (
      <div className={styles.profilePage}>
        <h1 className={styles.title}>Профиль</h1>
        <p>Вы не авторизованы.</p>
      </div>
    );
  }

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileHeader}>
        <img
          src='https://i.pravatar.cc/150'
          alt='Аватар пользователя'
          className={styles.avatar}
        />
        <div className={styles.userInfo}>
          {isEditing ? (
            <input
              type='text'
              value={userName}
              onChange={handleNameChange}
              onBlur={handleNameUpdate}
              onKeyDown={handleKeyDown}
              className={styles.userNameInput}
              autoFocus
            />
          ) : (
            <h1 className={styles.userName} onClick={() => setIsEditing(true)}>
              {user.name || 'Ваше имя'}
            </h1>
          )}

          <p className={styles.userEmail}>{user.email}</p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>История заказов</h2>
        <div className={styles.sectionContent}>
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id} className={styles.order}>
                <h3>Заказ от {new Date(order.date).toLocaleDateString()}</h3>
                <p>Сумма: ${order.total.toFixed(2)}</p>
                <div className={styles.productList}>
                  {order.items.map((product) => (
                    <div key={product.id} className={styles.productItem}>
                      <img src={product.image} alt={product.title} className={styles.productImage} />
                      <p className={styles.productTitle}>{product.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>У вас еще нет заказов.</p>
          )}
        </div>
      </div>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <span>Управление</span>
        </h2>
        <div className={styles.sectionContent}>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
