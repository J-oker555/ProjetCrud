const express = require('express');
const { registerUser, loginUser, getUsers, deleteUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);  // Inscription
router.post('/login', loginUser);  // Connexion
router.get('/', protect, getUsers);  // Récupérer tous les utilisateurs (admin)
router.delete('/:id', protect, deleteUser);  // Supprimer un utilisateur

module.exports = router;
