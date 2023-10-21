require('dotenv').config({ path: '../.env' })
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Hive = require('../models/Hive');

const app = express();

// Middleware
app.use(cors()); // Enables CORS for all routes
app.use(express.json()); // Parses incoming requests with JSON payloads

// MongoDB Connection
mongoose.connect("mongodb+srv://ssudevteam:w4UFRLSRQhg6IxYg@cluster0.p1zs5cn.mongodb.net/Apiary", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('Error connecting to MongoDB:', error));

// API Endpoints
app.get('/hives', async (req, res) => {
    try {
        const hives = await Hive.find();
        res.json(hives);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Server Start
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
