import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import "../index.css";
import "../styles/home.css";

const Home = () => {
  const [books, setBooks] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/books').then((res) => setBooks(res.data));
  }, []);

  const addToCart = async (bookId) => {
    if (!user) return navigate('/login');
    await axios.post('http://localhost:5000/api/cart/add', { bookId }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  };

  return (
    <div className="books-container">
      {books.map((book) => (
        <div className="book-card" key={book._id}>
          <img className="book-image" src={book.image} alt={book.title} />
          <h3 className="book-title">{book.title}</h3>
          <p className="book-price">{book.price}€</p>
          <button className="add-to-cart" onClick={() => addToCart(book._id)}>Ajouter au panier</button>
        </div>
      ))}
    </div>
  );
};

export default Home;
