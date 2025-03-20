import { useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
      login(res.data.token);
      navigate('/');
    } catch (error) {
      console.error('Erreur de connexion');
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;
