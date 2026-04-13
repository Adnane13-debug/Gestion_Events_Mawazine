const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  genre: { type: String, required: true },
  country: { type: String, required: true },
  stage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stage",
    required: true
  }
});

module.exports = mongoose.model("Artist", artistSchema);