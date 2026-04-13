const { readDB, writeDB } = require('../utils/db')

function getAllConcerts(req, res) {
  const data = readDB()
  res.status(200).json(data.concerts)
}

function getConcert(req, res) {
  const data = readDB()
  const id = parseInt(req.params.id)
  const concert = data.concerts.find(c => c.id === id)
  if (!concert) {
    return res.status(404).json({ message: 'Concert not found' })
  }
  res.status(200).json(concert)
}

function createConcert(req, res) {
  const { title, date, time, duration, artistId } = req.body

  if (!title || !date || !time || duration === undefined || artistId === undefined) {
    return res.status(400).json({ message: 'Fields title, date, time, duration and artistId are required' })
  }
  if (typeof duration !== 'number' || isNaN(duration) || duration <= 0) {
    return res.status(400).json({ message: 'duration must be a valid positive number' })
  }

  const data = readDB()
  const artistExists = data.artists.find(a => a.id === artistId)
  if (!artistExists) {
    return res.status(400).json({ message: `Artist with id ${artistId} does not exist` })
  }

  const newConcert = {
    id: data.concerts.length > 0 ? Math.max(...data.concerts.map(c => c.id)) + 1 : 1,
    title,
    date,
    time,
    duration,
    artistId
  }
  data.concerts.push(newConcert)
  writeDB(data)
  res.status(201).json(newConcert)
}

function updateConcert(req, res) {
  const data = readDB()
  const id = parseInt(req.params.id)
  const index = data.concerts.findIndex(c => c.id === id)

  if (index === -1) {
    return res.status(404).json({ message: 'Concert not found' })
  }

  const { title, date, time, duration, artistId } = req.body

  if (duration !== undefined && (typeof duration !== 'number' || isNaN(duration) || duration <= 0)) {
    return res.status(400).json({ message: 'duration must be a valid positive number' })
  }

  if (artistId !== undefined) {
    const artistExists = data.artists.find(a => a.id === artistId)
    if (!artistExists) {
      return res.status(400).json({ message: `Artist with id ${artistId} does not exist` })
    }
  }

  data.concerts[index] = {
    ...data.concerts[index],
    ...(title !== undefined && { title }),
    ...(date !== undefined && { date }),
    ...(time !== undefined && { time }),
    ...(duration !== undefined && { duration }),
    ...(artistId !== undefined && { artistId })
  }

  writeDB(data)
  res.status(200).json(data.concerts[index])
}

function deleteConcert(req, res) {
  const data = readDB()
  const id = parseInt(req.params.id)
  const index = data.concerts.findIndex(c => c.id === id)

  if (index === -1) {
    return res.status(404).json({ message: 'Concert not found' })
  }

  const deleted = data.concerts.splice(index, 1)[0]
  writeDB(data)
  res.status(200).json({ message: 'Concert deleted successfully', concert: deleted })
}

module.exports = { getAllConcerts, getConcert, createConcert, updateConcert, deleteConcert }
