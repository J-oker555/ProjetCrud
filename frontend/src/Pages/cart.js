import { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div>
      <h2>Votre Panier</h2>
      {cart.length === 0 ? <p>Votre panier est vide</p> : cart.map((item) => (
        <div key={item.book._id}>
          <h3>{item.book.title}</h3>
          <p>Quantité: {item.quantity}</p>
          <button onClick={() => removeFromCart(item.book._id)}>Supprimer</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
