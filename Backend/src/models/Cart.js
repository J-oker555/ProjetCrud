const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Lien avec l'utilisateur
    items: [
        {
            book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true }, // Lien avec un livre
            quantity: { type: Number, required: true, default: 1 }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Cart', CartSchema);
