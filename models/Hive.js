const mongoose = require("mongoose");

const HiveSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  strength: {
    type: Number,
    required: true
  },
  sugarSyrup: {
    type: Boolean,
    required: true
  },
  location: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  distanceFromOrigin: {
    type: Number,
  },
  tasks_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tasks",
  },
  images: [{
    type: String
  }]
});

// Check if model is already registered
const Hive = mongoose.models.Hive || mongoose.model("Hive", HiveSchema);

module.exports = Hive;
