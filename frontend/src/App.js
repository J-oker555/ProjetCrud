import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/home';
import Login from './Pages/login';
import Cart from './Pages/cart';
import Header from './Components/header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
