const mongoose = require("mongoose");

const concertSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
    required: true
  }
});

module.exports = mongoose.model("Concert", concertSchema);