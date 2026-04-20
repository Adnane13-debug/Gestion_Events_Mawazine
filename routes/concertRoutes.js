const express = require("express");
const router = express.Router();
const concertController = require("../controllers/concertController");
const auth = require("../middleware/auth");
const checkRole = require("../middleware/roles");

router.get("/",auth, concertController.getAllConcerts);
router.get("/:id",auth, concertController.getConcertById);
router.post("/",auth, checkRole, concertController.createConcert);
router.put("/:id",auth, checkRole, concertController.updateConcert);
router.delete("/:id",auth, checkRole, concertController.deleteConcert);

module.exports = router;