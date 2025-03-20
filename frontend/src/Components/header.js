import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';


const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header>
      <Link to="/">Accueil</Link>
      {user ? (
        <>
          <Link to="/cart">Panier</Link>
          <button onClick={logout}>Déconnexion</button>
        </>
      ) : (
        <Link to="/login">Connexion</Link>
      )}
    </header>
  );
};

export default Header;
