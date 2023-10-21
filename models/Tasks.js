const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    expected_work_hours: {
        type: Number,
        required: true
    },
    priority: {
        type: Number,
        required: true
    }
});

const Tasks = mongoose.models.Tasks || mongoose.model("Tasks", taskSchema);

module.exports = Tasks;
