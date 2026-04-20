const express = require("express");
const router = express.Router();
const stageController = require("../controllers/stageController");
const auth = require("../middleware/auth");
const checkRole = require("../middleware/roles");

router.get("/",auth ,stageController.getAllStages);
router.get("/:id",auth , stageController.getStageById);
router.post("/",auth, checkRole, stageController.createStage);
router.put("/:id",auth, checkRole, stageController.updateStage);
router.delete("/:id",auth, checkRole, stageController.deleteStage);

module.exports = router;