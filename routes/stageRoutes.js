const express = require('express')
const router = express.Router()

const {
  getAllStages,
  getStage,
  createStage,
  updateStage,
  deleteStage,
  getArtistsByStage
} = require('../controllers/stageController')

router.get('/stages', getAllStages)
router.get('/stages/:id', getStage)
router.post('/stages', createStage)
router.put('/stages/:id', updateStage)
router.delete('/stages/:id', deleteStage)

// Relational route
router.get('/stages/:id/artists', getArtistsByStage)

module.exports = router
