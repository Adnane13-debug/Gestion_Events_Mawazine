const express = require("express");
const router = express.Router();
const concertController = require("../controllers/concertController");

router.get("/", concertController.getAllConcerts);
router.get("/:id", concertController.getConcertById);
router.post("/", concertController.createConcert);
router.put("/:id", concertController.updateConcert);
router.delete("/:id", concertController.deleteConcert);

module.exports = router;