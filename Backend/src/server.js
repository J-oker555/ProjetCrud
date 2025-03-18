require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const bookRoutes = require('./routes/BookRoutes');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/books', bookRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
