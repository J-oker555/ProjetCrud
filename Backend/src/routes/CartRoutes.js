const express = require('express');
const { addToCart, getCart, removeFromCart, clearCart } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add', protect, addToCart);      // Ajouter un livre au panier
router.get('/', protect, getCart);            // Voir le panier de l'utilisateur
router.delete('/remove/:bookId', protect, removeFromCart);  // Supprimer un livre du panier
router.delete('/clear', protect, clearCart);  // Vider le panier

module.exports = router;
