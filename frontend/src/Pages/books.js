import { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/books.css"; // Assure-toi d'avoir un fichier CSS

const Books = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: '', author: '', price: '', image: '' });
  const [editingBookId, setEditingBookId] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const res = await axios.get('http://localhost:5000/api/books');
    setBooks(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingBookId) {
      await axios.put(`http://localhost:5000/api/books/${editingBookId}`, form);
      setEditingBookId(null);
    } else {
      await axios.post('http://localhost:5000/api/books', form);
    }
    setForm({ title: '', author: '', price: '', image: '' });
    fetchBooks();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/books/${id}`);
    fetchBooks();
  };

  const handleEdit = (book) => {
    setForm({ title: book.title, author: book.author, price: book.price, image: book.image });
    setEditingBookId(book._id);
  };

  return (
    <div className="books-container">
      <h2>📚 Gestion des Livres</h2>

      {/* Formulaire d'ajout/modification */}
      <form onSubmit={handleSubmit} className="book-form">
        <input type="text" placeholder="Titre" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <input type="text" placeholder="Auteur" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} required />
        <input type="number" placeholder="Prix" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
        <input type="text" placeholder="URL Image" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} required />
        <button type="submit">{editingBookId ? "Modifier" : "Ajouter"}</button>
      </form>

      {/* Affichage des livres */}
      <div className="books-list">
        {books.map((book) => (
          <div className="book-card" key={book._id}>
            <img src={book.image} alt={book.title} />
            <h3>{book.title}</h3>
            <p>📖 {book.author}</p>
            <p>💰 {book.price}€</p>
            <button className="edit-btn" onClick={() => handleEdit(book)}>✏ Modifier</button>
            <button className="delete-btn" onClick={() => handleDelete(book._id)}>🗑 Supprimer</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
