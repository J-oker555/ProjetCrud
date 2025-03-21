import { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/cart.css"; // Assure-toi de créer ce fichier

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/cart', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then((res) => setCart(res.data.items));
  }, []);

  const removeFromCart = async (bookId) => {
    await axios.delete(`http://localhost:5000/api/cart/remove/${bookId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setCart(cart.filter(item => item.book._id !== bookId));
  };

  return (
    <div className="cart-container">
      <h2>🛒 Votre Panier</h2>
      {cart.length === 0 ? (
        <p className="empty-cart">Votre panier est vide</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-item" key={item.book._id}>
              <img className="cart-image" src={item.book.image} alt={item.book.title} />
              <div className="cart-info">
                <h3>{item.book.title}</h3>
                <p>Quantité: {item.quantity}</p>
                <button className="remove-btn" onClick={() => removeFromCart(item.book._id)}>🗑 Supprimer</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
