const { readDB, writeDB } = require('../utils/db')

// GET /artists  (supports ?genre=Pop and ?stageId=2)
function getAllArtists(req, res) {
  const data = readDB()
  let artists = data.artists

  if (req.query.genre) {
    artists = artists.filter(a => a.genre.toLowerCase() === req.query.genre.toLowerCase())
  }
  if (req.query.stageId) {
    const stageId = parseInt(req.query.stageId)
    artists = artists.filter(a => a.stageId === stageId)
  }

  res.status(200).json(artists)
}

// GET /artists/search?name=ma
function searchArtists(req, res) {
  const { name } = req.query
  if (!name) {
    return res.status(400).json({ message: 'Query param "name" is required' })
  }
  const data = readDB()
  const results = data.artists.filter(a => a.name.toLowerCase().includes(name.toLowerCase()))
  res.status(200).json(results)
}

function getArtist(req, res) {
  const data = readDB()
  const id = parseInt(req.params.id)
  const artist = data.artists.find(a => a.id === id)
  if (!artist) {
    return res.status(404).json({ message: 'Artist not found' })
  }
  res.status(200).json(artist)
}

function createArtist(req, res) {
  const { name, genre, country, stageId } = req.body

  if (!name || !genre || !country || stageId === undefined) {
    return res.status(400).json({ message: 'Fields name, genre, country and stageId are required' })
  }

  const data = readDB()
  const stageExists = data.stages.find(s => s.id === stageId)
  if (!stageExists) {
    return res.status(400).json({ message: `Stage with id ${stageId} does not exist` })
  }

  const newArtist = {
    id: data.artists.length > 0 ? Math.max(...data.artists.map(a => a.id)) + 1 : 1,
    name,
    genre,
    country,
    stageId
  }
  data.artists.push(newArtist)
  writeDB(data)
  res.status(201).json(newArtist)
}

function updateArtist(req, res) {
  const data = readDB()
  const id = parseInt(req.params.id)
  const index = data.artists.findIndex(a => a.id === id)

  if (index === -1) {
    return res.status(404).json({ message: 'Artist not found' })
  }

  const { name, genre, country, stageId } = req.body

  if (stageId !== undefined) {
    const stageExists = data.stages.find(s => s.id === stageId)
    if (!stageExists) {
      return res.status(400).json({ message: `Stage with id ${stageId} does not exist` })
    }
  }

  data.artists[index] = {
    ...data.artists[index],
    ...(name !== undefined && { name }),
    ...(genre !== undefined && { genre }),
    ...(country !== undefined && { country }),
    ...(stageId !== undefined && { stageId })
  }

  writeDB(data)
  res.status(200).json(data.artists[index])
}

function deleteArtist(req, res) {
  const data = readDB()
  const id = parseInt(req.params.id)
  const index = data.artists.findIndex(a => a.id === id)

  if (index === -1) {
    return res.status(404).json({ message: 'Artist not found' })
  }

  const deleted = data.artists.splice(index, 1)[0]
  writeDB(data)
  res.status(200).json({ message: 'Artist deleted successfully', artist: deleted })
}

// GET /artists/:id/concerts
function getConcertsByArtist(req, res) {
  const data = readDB()
  const id = parseInt(req.params.id)
  const artist = data.artists.find(a => a.id === id)

  if (!artist) {
    return res.status(404).json({ message: 'Artist not found' })
  }

  const concerts = data.concerts.filter(c => c.artistId === id)
  res.status(200).json(concerts)
}

module.exports = { getAllArtists, searchArtists, getArtist, createArtist, updateArtist, deleteArtist, getConcertsByArtist }
