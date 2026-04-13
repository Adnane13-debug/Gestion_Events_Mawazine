const Artist = require("../models/Artist");
const Stage = require("../models/Stage");

// GET all artists (filter by genre, search by name)
exports.getAllArtists = async (req, res) => {
  try {
    const filter = {};
    if (req.query.genre) filter.genre = req.query.genre;
    if (req.query.name) {
      filter.name = { $regex: req.query.name, $options: "i" };
    }
    const artists = await Artist.find(filter).populate("stage").sort({ name: 1 });
    res.json(artists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET one artist by ID
exports.getArtistById = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id).populate("stage");
    if (!artist) return res.status(404).json({ error: "Artist not found" });
    res.json(artist);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
};

// POST create an artist
exports.createArtist = async (req, res) => {
  try {
    const { name, genre, country, stage } = req.body;
    if (!name || !genre || !country || !stage) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    // Check that the stage exists
    const stageExists = await Stage.findById(stage);
    if (!stageExists) return res.status(404).json({ error: "Stage not found" });

    const artist = await Artist.create({ name, genre, country, stage });
    res.status(201).json(artist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT update an artist
exports.updateArtist = async (req, res) => {
  try {
    const artist = await Artist.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!artist) return res.status(404).json({ error: "Artist not found" });
    res.json(artist);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID or data" });
  }
};

// DELETE an artist
exports.deleteArtist = async (req, res) => {
  try {
    const artist = await Artist.findByIdAndDelete(req.params.id);
    if (!artist) return res.status(404).json({ error: "Artist not found" });
    res.json({ message: "Artist deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
};