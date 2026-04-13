const Stage = require("../models/Stage");

// GET all stages (with optional search by name)
exports.getAllStages = async (req, res) => {
  try {
    const filter = {};
    if (req.query.name) {
      filter.name = { $regex: req.query.name, $options: "i" };
    }
    const stages = await Stage.find(filter).sort({ name: 1 });
    res.json(stages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET one stage by ID
exports.getStageById = async (req, res) => {
  try {
    const stage = await Stage.findById(req.params.id);
    if (!stage) return res.status(404).json({ error: "Stage not found" });
    res.json(stage);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
};

// POST create a stage
exports.createStage = async (req, res) => {
  try {
    const { name, location, capacity } = req.body;
    if (!name || !location || !capacity) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const stage = await Stage.create({ name, location, capacity });
    res.status(201).json(stage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT update a stage
exports.updateStage = async (req, res) => {
  try {
    const stage = await Stage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!stage) return res.status(404).json({ error: "Stage not found" });
    res.json(stage);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID or data" });
  }
};

// DELETE a stage
exports.deleteStage = async (req, res) => {
  try {
    const stage = await Stage.findByIdAndDelete(req.params.id);
    if (!stage) return res.status(404).json({ error: "Stage not found" });
    res.json({ message: "Stage deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
};