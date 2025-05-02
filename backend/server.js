const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const doctorRoutes = require('./routes/doctorRoutes');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

// Routes
app.use('/api/doctors', doctorRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('API is running');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));