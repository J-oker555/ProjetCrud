import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

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
    <div>
      {books.map((book) => (
        <div key={book._id}>
          <img src={book.image} alt={book.title} />
          <h3>{book.title}</h3>
          <p>{book.price}€</p>
          <button onClick={() => addToCart(book._id)}>Ajouter au panier</button>
        </div>
      ))}
    </div>
  );
};

export default Home;
