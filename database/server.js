require('dotenv').config({ path: '../.env' })
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Hive = require('../models/Hive');
const Tasks = require('../models/Tasks');

const app = express();

// Middleware
app.use(cors()); // Enables CORS for all routes  (Only for Production!!!)
app.use(express.json()); // Parses incoming requests with JSON payloads

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
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

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Tasks.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Tasks.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        console.error("Error fetching task by ID:", error);  // Log the error to see more details
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

app.post('/hive/:id', async (req, res) => {
    try {
        const hiveId = req.params.id;
        const { hive } = req.body;

        if (!hive || !hive.distanceFromOrigin) {
            return res.status(400).json({ message: 'Invalid input: hive and distanceFromOrigin are required' });
        }

        const updatedHive = await Hive.findByIdAndUpdate(hiveId, { $set: { distanceFromOrigin: hive.distanceFromOrigin } }, { new: true });

        if (!updatedHive) {
            return res.status(404).json({ message: 'Hive not found' });
        }

        res.json(updatedHive);
    } catch (error) {
        console.error("Error updating hive:", error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});


const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
