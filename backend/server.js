// backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./db');  // Import DB connection

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.send('Resume Analyzer Backend is running 🚀');
});

// Test DB route
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ success: true, time: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

const resumeRoutes = require('./routes/resumeRoutes');
app.use('/api/resumes', resumeRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
