const Concert = require("../models/Concert");
const Artist = require("../models/Artist");

// GET all concerts (filter by date)
exports.getAllConcerts = async (req, res) => {
  try {
    const filter = {};
    if (req.query.date) filter.date = req.query.date;
    const concerts = await Concert.find(filter).populate({
      path: "artist",
      populate: { path: "stage" }
    }).sort({ date: 1 });
    res.json(concerts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET one concert by ID
exports.getConcertById = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id).populate({
      path: "artist",
      populate: { path: "stage" }
    });
    if (!concert) return res.status(404).json({ error: "Concert not found" });
    res.json(concert);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
};

// POST create a concert
exports.createConcert = async (req, res) => {
  try {
    const { date, time, artist } = req.body;
    if (!date || !time || !artist) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    // Check that the artist exists
    const artistExists = await Artist.findById(artist);
    if (!artistExists) return res.status(404).json({ error: "Artist not found" });

    const concert = await Concert.create({ date, time, artist });
    res.status(201).json(concert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT update a concert
exports.updateConcert = async (req, res) => {
  try {
    const concert = await Concert.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!concert) return res.status(404).json({ error: "Concert not found" });
    res.json(concert);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID or data" });
  }
};

// DELETE a concert
exports.deleteConcert = async (req, res) => {
  try {
    const concert = await Concert.findByIdAndDelete(req.params.id);
    if (!concert) return res.status(404).json({ error: "Concert not found" });
    res.json({ message: "Concert deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
};