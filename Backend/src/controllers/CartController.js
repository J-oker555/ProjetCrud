const Cart = require('../models/Cart');
const Book = require('../models/Book');

// Ajouter un livre au panier
const addToCart = async (req, res) => {
    const { bookId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            cart = new Cart({ user: req.user.id, items: [] });
        }

        const bookExists = cart.items.find(item => item.book.toString() === bookId);
        if (bookExists) {
            bookExists.quantity += quantity || 1;
        } else {
            cart.items.push({ book: bookId, quantity: quantity || 1 });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Voir le panier de l'utilisateur
const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('items.book');
        if (!cart) return res.status(404).json({ message: "Panier vide" });

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Supprimer un livre du panier
const removeFromCart = async (req, res) => {
    const { bookId } = req.params;

    try {
        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) return res.status(404).json({ message: "Panier vide" });

        cart.items = cart.items.filter(item => item.book.toString() !== bookId);
        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Vider le panier
const clearCart = async (req, res) => {
    try {
        await Cart.findOneAndDelete({ user: req.user.id });
        res.status(200).json({ message: "Panier vidé" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addToCart, getCart, removeFromCart, clearCart };
