const express = require('express')
const router = express.Router()

const {
  getAllConcerts,
  getConcert,
  createConcert,
  updateConcert,
  deleteConcert
} = require('../controllers/concertController')

router.get('/concerts', getAllConcerts)
router.get('/concerts/:id', getConcert)
router.post('/concerts', createConcert)
router.put('/concerts/:id', updateConcert)
router.delete('/concerts/:id', deleteConcert)

module.exports = router
