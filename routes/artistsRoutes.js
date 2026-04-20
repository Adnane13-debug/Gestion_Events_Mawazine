const express = require("express");
const router = express.Router();
const artistController = require("../controllers/artistsController");
const auth = require("../middleware/auth");
const checkRole = require("../middleware/roles");

router.get("/",auth, artistController.getAllArtists);
router.get("/:id",auth, artistController.getArtistById);
router.post("/",auth, checkRole, artistController.createArtist);
router.put("/:id",auth, checkRole, artistController.updateArtist);
router.delete("/:id",auth, checkRole, artistController.deleteArtist);

module.exports = router;