const { readDB, writeDB } = require('../utils/db')

function getAllStages(req, res) {
  const data = readDB()
  res.status(200).json(data.stages)
}

function getStage(req, res) {
  const data = readDB()
  const id = parseInt(req.params.id)
  const stage = data.stages.find(s => s.id === id)
  if (!stage) {
    return res.status(404).json({ message: 'Stage not found' })
  }
  res.status(200).json(stage)
}

function createStage(req, res) {
  const { name, city, capacity } = req.body

  if (!name || !city || capacity === undefined) {
    return res.status(400).json({ message: 'Fields name, city and capacity are required' })
  }
  if (typeof capacity !== 'number' || isNaN(capacity) || capacity <= 0) {
    return res.status(400).json({ message: 'capacity must be a valid positive number' })
  }

  const data = readDB()
  const newStage = {
    id: data.stages.length > 0 ? Math.max(...data.stages.map(s => s.id)) + 1 : 1,
    name,
    city,
    capacity
  }
  data.stages.push(newStage)
  writeDB(data)
  res.status(201).json(newStage)
}

function updateStage(req, res) {
  const data = readDB()
  const id = parseInt(req.params.id)
  const index = data.stages.findIndex(s => s.id === id)

  if (index === -1) {
    return res.status(404).json({ message: 'Stage not found' })
  }

  const { name, city, capacity } = req.body

  if (capacity !== undefined && (typeof capacity !== 'number' || isNaN(capacity) || capacity <= 0)) {
    return res.status(400).json({ message: 'capacity must be a valid positive number' })
  }

  data.stages[index] = {
    ...data.stages[index],
    ...(name !== undefined && { name }),
    ...(city !== undefined && { city }),
    ...(capacity !== undefined && { capacity })
  }

  writeDB(data)
  res.status(200).json(data.stages[index])
}

function deleteStage(req, res) {
  const data = readDB()
  const id = parseInt(req.params.id)
  const index = data.stages.findIndex(s => s.id === id)

  if (index === -1) {
    return res.status(404).json({ message: 'Stage not found' })
  }

  const deleted = data.stages.splice(index, 1)[0]
  writeDB(data)
  res.status(200).json({ message: 'Stage deleted successfully', stage: deleted })
}

// GET /stages/:id/artists
function getArtistsByStage(req, res) {
  const data = readDB()
  const id = parseInt(req.params.id)
  const stage = data.stages.find(s => s.id === id)

  if (!stage) {
    return res.status(404).json({ message: 'Stage not found' })
  }

  const artists = data.artists.filter(a => a.stageId === id)
  res.status(200).json(artists)
}

module.exports = { getAllStages, getStage, createStage, updateStage, deleteStage, getArtistsByStage }
