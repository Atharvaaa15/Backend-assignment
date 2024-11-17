const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const mongoose = require('mongoose');
require('dotenv').config();  // Load environment variables from .env file

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/assignment_portal';

const options = {
  useNewUrlParser: true, // Deprecated but harmless
  useUnifiedTopology: true, // Deprecated but harmless
  serverSelectionTimeoutMS: 5000,  // Timeout after 5 seconds if unable to connect
  socketTimeoutMS: 45000,         // Timeout for operations to the server
  connectTimeoutMS: 30000         // Timeout for the initial connection
};

mongoose.connect(mongoURI, options)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));


// Load environment variables from .env file
dotenv.config();


dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
