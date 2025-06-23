import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import { getCategories, getProducts } from './services/api';

import Cart from './components/Cart.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Modal from './components/Modal.jsx';
import HomePage from './pages/HomePage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ProductDetails from './components/ProductDetails.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';

function App() {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isCartModalOpen, setCartModalOpen] = useState(false);
  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cartItems');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Could not load cart from localStorage', error);
      return [];
    }
  });
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUserSession = localStorage.getItem('userSession');
    if (storedUserSession) {
      const session = JSON.parse(storedUserSession);
      if (new Date().getTime() < session.expiry) {
        setLoggedIn(true);
        setUser(session.user);
      } else {
        localStorage.removeItem('userSession');
      }
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Could not save cart to localStorage', error);
    }
  }, [cartItems]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
        setError('Could not load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const hardcodedUser = {
    email: 'tt@email.ru',
    password: '123',
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === hardcodedUser.email && password === hardcodedUser.password) {
      setLoggedIn(true);
      setUser(hardcodedUser);

      const session = {
        user: hardcodedUser,
        expiry: new Date().getTime() + 24 * 60 * 60 * 1000, // 24 hours
      };
      localStorage.setItem('userSession', JSON.stringify(session));

      closeLoginModal();
      setEmail('');
      setPassword('');
    } else {
      setError('Неверный логин или пароль');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUser(null);
    localStorage.removeItem('userSession');
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
    const storedUserSession = localStorage.getItem('userSession');
    if (storedUserSession) {
      const session = JSON.parse(storedUserSession);
      session.user = updatedUser;
      localStorage.setItem('userSession', JSON.stringify(session));
    }
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const toggleFavorite = (productId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(productId)
        ? prevFavorites.filter((id) => id !== productId)
        : [...prevFavorites, productId]
    );
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setProductModalOpen(true);
  };

  const closeProductModal = () => {
    setProductModalOpen(false);
    setSelectedProduct(null);
  };

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => {
    setLoginModalOpen(false);
    setEmail('');
    setPassword('');
    setError('');
  };

  const openCartModal = () => setCartModalOpen(true);
  const closeCartModal = () => setCartModalOpen(false);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id);
      if (itemExists) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      closeCartModal();
      openLoginModal();
      return;
    }

    if (cartItems.length === 0) return;

    const newOrder = {
      id: new Date().getTime(), // Simple unique ID
      date: new Date().toLocaleDateString(),
      items: cartItems,
      total: cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
    };

    setOrders((prevOrders) => [...prevOrders, newOrder]);
    setCartItems([]);
    closeCartModal();
  };

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  const mainContentClass =
    isLoginModalOpen || isCartModalOpen || isProductModalOpen ? 'blurred' : '';

  return (
    <Router>
      <div className='app-container'>
        <Header
          isLoggedIn={isLoggedIn}
          openLoginModal={openLoginModal}
          openCartModal={openCartModal}
          cartItemCount={cartItems.reduce(
            (count, item) => count + item.quantity,
            0
          )}
          categories={categories}
          onSelectCategory={handleSelectCategory}
        />
        <main className={mainContentClass}>
          <Routes>
            <Route
              path='/'
              element={
                <HomePage
                  products={filteredProducts}
                  loading={loading}
                  error={error}
                  addToCart={addToCart}
                  onProductClick={openProductModal}
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                />
              }
            />
            <Route
              path='/favorites'
              element={
                isLoggedIn ? (
                  <FavoritesPage
                    favoriteProducts={products.filter((p) =>
                      favorites.includes(p.id)
                    )}
                    onToggleFavorite={toggleFavorite}
                    onProductClick={openProductModal}
                    addToCart={addToCart}
                    favorites={favorites}
                  />
                ) : (
                  <Navigate to='/' />
                )
              }
            />
            <Route
              path='/profile'
              element={
                <ProfilePage
                  user={user}
                  onLogout={handleLogout}
                  orders={orders}
                  onUpdateUser={handleUpdateUser}
                />
              }
            />
          </Routes>
        </main>
        <Footer />
        {isLoginModalOpen && (
          <Modal
            onClose={closeLoginModal}
            size='small'
            title='Вход'
          >
            <form onSubmit={handleLogin}>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <div>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  id='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor='password'>Пароль</label>
                <input
                  type='password'
                  id='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type='submit'>Войти</button>
            </form>
          </Modal>
        )}
        {isCartModalOpen && (
          <Cart
            items={cartItems}
            onClose={closeCartModal}
            onRemove={removeFromCart}
            onCheckout={handleCheckout}
          />
        )}
        {isProductModalOpen && selectedProduct && (
          <Modal onClose={closeProductModal} title={selectedProduct.title}>
            <ProductDetails
              product={selectedProduct}
              isFavorite={favorites.includes(selectedProduct.id)}
              onToggleFavorite={toggleFavorite}
              addToCart={addToCart}
            />
          </Modal>
        )}
      </div>
    </Router>
  );
}

export default App;
