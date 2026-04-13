const express = require('express')
const router = express.Router()

const {
  getAllArtists,
  searchArtists,
  getArtist,
  createArtist,
  updateArtist,
  deleteArtist,
  getConcertsByArtist
} = require('../controllers/artistsController')

// Search must come BEFORE /:id to avoid conflict
router.get('/artists/search', searchArtists)

router.get('/artists', getAllArtists)
router.get('/artists/:id', getArtist)
router.post('/artists', createArtist)
router.put('/artists/:id', updateArtist)
router.delete('/artists/:id', deleteArtist)

// Relational route
router.get('/artists/:id/concerts', getConcertsByArtist)

module.exports = router
